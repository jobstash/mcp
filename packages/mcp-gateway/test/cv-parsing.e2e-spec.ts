import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NluService } from '../src/nlu/nlu.service';
import { McpClientService } from '../src/mcp-client/mcp-client.service';
import { CvParsingService } from '../src/cv-parsing/cv-parsing.service'; // Need to potentially mock its internal parsing
import { UserProfile } from '../src/common/dtos/user-profile.dto';
import { CvJobData } from '../src/common/dtos/cv-job-data.dto';
import { OpenAIFileParserService, FILE_PARSER_SERVICE } from '@jobstash/file-parser';
import * as path from 'path';
import * as fs from 'fs';

describe('CvParsingController (e2e)', () => {
    let app: INestApplication;
    let nluService: NluService;
    let mcpClientService: McpClientService;
    let cvParsingService: CvParsingService; // To mock file parsing

    // Mock data
    const mockCvText = "This is the parsed CV text.";
    const mockCvJobData: CvJobData = {
        skills: ["nestjs", "typescript"],
        locations: ["Remote"],
        seniorityKeywords: ["senior"]
    };
    const mockUserProfile: UserProfile = {
        name: "Test User",
        location: { city: "Test City", country: "Testland" },
        linkedAccounts: { email: "test@example.com", github: "testuser" }
    };
    const mockJobstashUrl = "https://jobstash.xyz/jobs?tags=nestjs%2Ctypescript&locations=Remote&seniority=senior";
    const mockMcpUrlResult = { content: [{ type: "text", text: JSON.stringify({ jobstashUrl: mockJobstashUrl }) }] };

    // Mock implementations
    const mockFileParserService = {
        parse: jest.fn(),
    };

    const mockNluService = {
        extractCvData: jest.fn(),
    };

    const mockMcpClientService = {
        callTool: jest.fn(),
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(OpenAIFileParserService)
            .useValue(mockFileParserService)
            .overrideProvider(NluService)
            .useValue(mockNluService)
            .overrideProvider(McpClientService)
            .useValue(mockMcpClientService)
            .compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api/v1'); // Assuming global prefix is set as per typical NestJS setup
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // Ensure validation pipes are active
        await app.init();

        // Get references to services if needed for spying later
        nluService = moduleFixture.get<NluService>(NluService);
        mcpClientService = moduleFixture.get<McpClientService>(McpClientService);
        cvParsingService = moduleFixture.get<CvParsingService>(CvParsingService);
    });

    beforeEach(() => {
        // Reset mocks before each test
        mockFileParserService.parse.mockReset();
        mockNluService.extractCvData.mockReset();
        mockMcpClientService.callTool.mockReset();
        // Re-mock NLU service to return the standard mock data for each test
        (nluService.extractCvData as jest.Mock).mockResolvedValue({
            cvJobData: mockCvJobData,
            userProfile: mockUserProfile
        });
        // Re-mock MCP client service for each test
        (mcpClientService.callTool as jest.Mock).mockResolvedValue(mockMcpUrlResult);
    });

    it('POST /api/v1/cv/parse - should process CV and return URL + UserProfile', async () => {
        // --- Mock the internal file parsing step within CvParsingService ---
        // We avoid calling the real (unimplemented) OpenAI parsing
        const parseCvFileSpy = jest.spyOn(cvParsingService as any, 'parseCvFileWithOpenAI')
            .mockResolvedValue(mockCvText);

        const filePath = path.join(__dirname, 'test-files', 'dummy.pdf'); // Need a dummy file
        // Ensure the dummy file exists for the test runner
        const testFilesDir = path.join(__dirname, 'test-files');
        if (!fs.existsSync(testFilesDir)) {
            fs.mkdirSync(testFilesDir);
        }
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, 'dummy content');
        }

        const response = await request(app.getHttpServer())
            .post('/api/v1/cv/parse')
            .attach('cv', filePath) // Attach the dummy file
            .expect(201);

        // Check response structure
        expect(response.body).toEqual({
            jobstashUrl: mockJobstashUrl,
            userProfile: mockUserProfile,
        });

        // Check if mocks were called correctly
        expect(parseCvFileSpy).toHaveBeenCalledTimes(1);
        // Check NLU service was called with the mocked parsed text
        expect(nluService.extractCvData).toHaveBeenCalledWith(mockCvText);
        // Check MCP client was called with the correct tool name and NLU job data output
        expect(mcpClientService.callTool).toHaveBeenCalledWith({
            name: 'process_cv_job_data',
            arguments: mockCvJobData,
        });

        parseCvFileSpy.mockRestore(); // Clean up spy
    });

    describe('POST /api/v1/cv/parse', () => {
        it('should successfully parse a CV and return jobstash URL and user profile', async () => {
            // Prepare mock responses
            const mockParsedText = 'This is the parsed CV text.';
            const mockCvJobData: CvJobData = {
                skills: ['NestJS', 'TypeScript'],
                jobTitles: ['Software Engineer'],
                locations: ['Remote'],
            };
            const mockUserProfile: UserProfile = {
                name: 'Test User',
                location: { city: 'Test City', country: 'Testland' },
            };
            const mockMcpUrl = 'https://jobstash.com/search/123';

            mockFileParserService.parse.mockResolvedValue(mockParsedText);
            mockNluService.extractCvData.mockResolvedValue({
                cvJobData: mockCvJobData,
                userProfile: mockUserProfile,
            });
            mockMcpClientService.callTool.mockResolvedValue({ jobstashUrl: mockMcpUrl });

            // Perform the request
            const response = await request(app.getHttpServer())
                .post('/api/v1/cv/parse')
                .attach('cv', path.resolve(__dirname, '../../../test/test_cvs/test_cv_1.pdf')) // 'cv' is the field name expected by FileInterceptor
                .expect(201); // Assuming POST returns 201 Created

            // Assertions
            expect(response.body).toBeDefined();
            expect(response.body.jobstashUrl).toEqual(mockMcpUrl);
            expect(response.body.userProfile).toEqual(mockUserProfile);

            // Verify that mocks were called with expected arguments
            expect(mockFileParserService.parse).toHaveBeenCalledWith(expect.objectContaining({
                originalname: path.basename(path.resolve(__dirname, '../../../test/test_cvs/test_cv_1.pdf')),
                // buffer: expect.any(Buffer) // Buffer content can be tricky to match exactly unless necessary
            }));
            expect(mockNluService.extractCvData).toHaveBeenCalledWith(mockParsedText);
            expect(mockMcpClientService.callTool).toHaveBeenCalledWith(expect.objectContaining({
                toolName: 'process_cv_job_data',
                toolArguments: mockCvJobData,
            }));
        });

        it('should return 400 if no file is uploaded', async () => {
            return request(app.getHttpServer())
                .post('/api/v1/cv/parse')
                .expect(400);
            // Add more specific error message checking if desired
        });

        it('should return 500 if file parsing fails', async () => {
            mockFileParserService.parse.mockRejectedValue(new Error('Parsing failed'));

            return request(app.getHttpServer())
                .post('/api/v1/cv/parse')
                .attach('cv', path.resolve(__dirname, '../../../test/test_cvs/test_cv_1.pdf'))
                .expect(500) // Or 422 if you mapped to Unprocessable Entity
                .then(response => {
                    expect(response.body.message).toContain('Failed to process CV content: Error parsing CV file: Parsing failed');
                });
        });
 });

    // Add more tests:
    // - File too large
    // - Wrong file type
    // - No file attached
    // - NLU service fails/returns null
    // - MCP client fails/returns null or error

    afterAll(async () => {
        await app.close();
    });
}); 
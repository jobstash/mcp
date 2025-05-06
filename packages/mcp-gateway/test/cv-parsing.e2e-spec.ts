import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NluService } from '../src/nlu/nlu.service';
import { McpClientService } from '../src/mcp-client/mcp-client.service';
import { CvParsingService } from '../src/cv-parsing/cv-parsing.service'; // Need to potentially mock its internal parsing
import { UserProfile } from '../src/common/dtos/user-profile.dto';
import { CvJobData } from '../src/common/dtos/cv-job-data.dto';
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

    beforeAll(async () => {
        // --- Mock NLU Service ---
        const mockNluService = {
            // Mock the specific method used by CvParsingService
            extractCvData: jest.fn().mockResolvedValue({
                cvJobData: mockCvJobData,
                userProfile: mockUserProfile
            }),
            // Keep other methods if they exist, or mock them as needed
            performNlu: jest.fn(), // Example: Mock other methods if needed elsewhere
        };

        // --- Mock MCP Client Service ---
        const mockMcpClientService = {
            callTool: jest.fn().mockResolvedValue(mockMcpUrlResult),
            // Add other methods if they exist and need mocking
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(NluService)
            .useValue(mockNluService)
            .overrideProvider(McpClientService)
            .useValue(mockMcpClientService)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe()); // Ensure pipes are applied
        await app.init();

        // Get references to services if needed for spying later
        nluService = moduleFixture.get<NluService>(NluService);
        mcpClientService = moduleFixture.get<McpClientService>(McpClientService);
        cvParsingService = moduleFixture.get<CvParsingService>(CvParsingService);
    });

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
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
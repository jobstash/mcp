import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module'; // Main application module
import * as path from 'path';
import * as fs from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';

// This test suite runs against the actual services, including OpenAI and MCP server calls.
// Ensure that:
// 1. Your .env file (or environment variables) has OPENAI_API_KEY, OPENAI_ASSISTANT_ID_PARSER, and OPENAI_MODEL set.
// 2. Your @jobstash/mcp-server is running and accessible at the URL configured for McpClientService.
// 3. The `test/test_cvs/test_cv_1.pdf` file exists.

describe('CvParsingController (Real E2E - No Mocks)', () => {
    let app: INestApplication;
    const cvFilePath = path.resolve(__dirname, 'test_cvs/test_cv_1.pdf');

    beforeAll(async () => {
        // Ensure .env is loaded for ConfigService if not already globally handled
        // Depending on your setup, ConfigModule.forRoot might be in AppModule already.
        // If tests are run from a context where .env isn't loaded by default for the test process,
        // you might need to explicitly load it here or ensure the test runner does.

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule, // Import the main AppModule which should bring in all necessary modules
                // Ensure AppModule imports ConfigModule.forRoot({ isGlobal: true, envFilePath: 'path/to/.env'})
            ],
        })
            // NO .overrideProvider() for FileParserService, NluService, or McpClientService
            .compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api/v1');
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();
    }, 30000); // Increase timeout for module initialization if it involves async ops or external connections

    afterAll(async () => {
        await app.close();
    });

    describe('POST /api/v1/cv/parse', () => {
        it(
            'should successfully parse a real CV, get NLU data, call MCP, and return results',
            async () => {
                if (!fs.existsSync(cvFilePath)) {
                    throw new Error(`Test CV file not found at ${cvFilePath}. Please ensure it exists.`);
                }

                // Perform the request
                const response = await request(app.getHttpServer())
                    .post('/api/v1/cv/parse')
                    .attach('cv', cvFilePath)
                    .expect(201);

                // Assertions - these will depend on the actual content of test_cv_1.pdf and your NLU/MCP logic
                expect(response.body).toBeDefined();
                expect(response.body.jobstashUrl).toBeDefined(); // Expect a URL or null
                expect(response.body.userProfile).toBeDefined(); // Expect a user profile object or null

                // More specific assertions can be added if you know the expected output for test_cv_1.pdf
                // For example:
                // expect(typeof response.body.jobstashUrl).toBe('string'); // If a URL is always expected for this CV
                // expect(response.body.userProfile.name).toBeDefined();
                // Be cautious with asserting exact text matches from NLU as they can be variable.
                console.log('Real E2E Response:', JSON.stringify(response.body, null, 2));
            },
            60000, // Increase timeout for this test as it involves multiple API calls
        );

        // Add a test for a file that should be rejected by validation (e.g., too large, wrong type)
        it('should reject a file that is too large', async () => {
            const largeFilePath = path.resolve(__dirname, 'large_test_file.pdf');
            if (!fs.existsSync(largeFilePath)) {
                fs.writeFileSync(largeFilePath, Buffer.alloc(6 * 1024 * 1024)); // 6MB file
            }

            const response = await request(app.getHttpServer())
                .post('/api/v1/cv/parse')
                .attach('cv', largeFilePath)
                .expect(400);

            // Adjusted to match NestJS MaxFileSizeValidator's typical message format
            expect(response.body.message).toMatch(/Validation failed \(expected size is less than \d+\)/);

            fs.unlinkSync(largeFilePath); // Clean up dummy file
        }, 20000);

        // Test for invalid file type
        it('should reject an invalid file type', async () => {
            const invalidTypeFilePath = path.resolve(__dirname, 'test_file.zip');
            if (!fs.existsSync(invalidTypeFilePath)) {
                fs.writeFileSync(invalidTypeFilePath, 'dummy zip content');
            }

            const response = await request(app.getHttpServer())
                .post('/api/v1/cv/parse')
                .attach('cv', invalidTypeFilePath)
                .expect(400);

            // Adjusted to be more flexible with the FileTypeValidator's message
            expect(response.body.message).toMatch(/Validation failed .* expected type is \(pdf\|doc\|docx\|txt\|md\)/);

            fs.unlinkSync(invalidTypeFilePath); // Clean up
        }, 20000);

    });
}); 
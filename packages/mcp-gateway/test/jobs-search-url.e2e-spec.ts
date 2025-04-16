import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NluService } from './../src/nlu/nlu.service';
import { McpClientService } from './../src/mcp-client/mcp-client.service';

// --- Mock Services ---
const mockNluResult = { tags: ['senior', 'frontend'], locations: ['Berlin'] };
// Corrected: Provide a `jobstashUrl` as expected by JobUrlController
const mockMcpResultJobUrl = { success: true, jobstashUrl: 'https://jobstash.xyz/jobs?q=test' };

const mockNluService = {
  performNlu: jest.fn().mockResolvedValue(mockNluResult),
};

const mockMcpClientService = {
  callTool: jest.fn().mockResolvedValue(mockMcpResultJobUrl), // Use the jobUrl mock result by default
  getClient: jest.fn().mockReturnValue({}),
  onModuleInit: jest.fn(), // Prevent real init logic from running
  onModuleDestroy: jest.fn(),
  isConnected: true, // Assume connected for mock
};

describe('JobsSearchUrlController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => { // Use beforeAll as the app setup is needed once per suite
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    // Override the real services with our mocks
    .overrideProvider(NluService).useValue(mockNluService)
    .overrideProvider(McpClientService).useValue(mockMcpClientService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => { // Add afterAll to close the app connection
    await app.close();
  });

  beforeEach(() => {
    // Reset mocks before each test run
    jest.clearAllMocks();
    // Restore default mock implementations
    mockNluService.performNlu.mockResolvedValue(mockNluResult);
    mockMcpClientService.callTool.mockResolvedValue(mockMcpResultJobUrl);
  });

  // Test for POST /api/v1/jobs-search-url
  it('POST /api/v1/jobs-search-url - should process query and return a JobStash URL', () => {
    const query = 'senior backend engineer remote';
    return request(app.getHttpServer())
      .post('/api/v1/jobs-search-url')
      .send({ query })
      .expect(201) // Corrected: Expect 201 Created for successful POST
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.jobstashUrl).toBeDefined();
        expect(res.body.jobstashUrl).toEqual(mockMcpResultJobUrl.jobstashUrl); // Check the actual URL
        // Check mocks were called
        expect(mockNluService.performNlu).toHaveBeenCalledWith(query);
        expect(mockMcpClientService.callTool).toHaveBeenCalledWith({
            name: 'get_search_jobs_url',
            arguments: mockNluResult
        });
      });
  });

  it('POST /api/v1/jobs-search-url - should return 400 for missing query', () => {
    return request(app.getHttpServer())
      .post('/api/v1/jobs-search-url')
      .send({}) // Send empty body
      .expect(400); // Expect Bad Request
  });

  // Removed tests for /api/v1/parameters/extract as the endpoint doesn't seem to exist

});

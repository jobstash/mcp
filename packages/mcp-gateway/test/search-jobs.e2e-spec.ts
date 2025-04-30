// packages/mcp-gateway/test/job-list.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Adjust path if needed
import { NluService } from '../src/nlu/nlu.service';
import { McpClientService } from '../src/mcp-client/mcp-client.service';

// --- Mock Services ---
const mockNluResult = { tags: ['backend', 'remote'], seniority: ['senior'] };
const mockMcpResultJobList = { success: true, jobs: [{ id: 'job1', title: 'Senior Backend Dev' }] };

const mockNluService = {
  performNlu: jest.fn().mockResolvedValue(mockNluResult),
};

const mockMcpClientService = {
  callTool: jest.fn().mockResolvedValue(mockMcpResultJobList),
  getClient: jest.fn().mockReturnValue({}),
  onModuleInit: jest.fn(),
  onModuleDestroy: jest.fn(),
  isConnected: true,
};


describe('SearchJobsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Override services with mocks for e2e tests
      .overrideProvider(NluService)
      .useValue(mockNluService)
      .overrideProvider(McpClientService)
      .useValue(mockMcpClientService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Restore default mock implementations if they were changed in a test
    mockNluService.performNlu.mockResolvedValue(mockNluResult);
    mockMcpClientService.callTool.mockResolvedValue(mockMcpResultJobList);
  });

  it('/api/v1/search-jobs (POST) - should process query, call MCP search_jobs, and return job list', () => {
    const searchQuery = "senior backend engineer remote";

    return request(app.getHttpServer())
      .post('/api/v1/jobs/list')
      .send({ query: searchQuery })
      .expect(201) // Corrected: Expect 201 Created for successful POST
      .expect((res) => {
        // Check if NLU service was called correctly
        expect(mockNluService.performNlu).toHaveBeenCalledTimes(1);
        expect(mockNluService.performNlu).toHaveBeenCalledWith(searchQuery);

        // Check if MCP client service was called correctly
        expect(mockMcpClientService.callTool).toHaveBeenCalledTimes(1);
        // Check the arguments passed to callTool based on mockNluResult
        expect(mockMcpClientService.callTool).toHaveBeenCalledWith({
          name: 'search_jobs', // Tool name from controller
          arguments: mockNluResult, // Args derived from NLU
        });

        // Check the response body
        expect(res.body).toEqual({ jobs: mockMcpResultJobList.jobs });
      });
  });

  it('/api/v1/jobs/list (POST) - should handle NLU failure', () => {
    const searchQuery = "some query causing nlu error";
    const nluError = new Error("NLU Processing Failed");
    mockNluService.performNlu.mockRejectedValueOnce(nluError);

    return request(app.getHttpServer())
      .post('/api/v1/jobs/list')
      .send({ query: searchQuery })
      .expect(500) // Assuming Internal Server Error for NLU failure
      .expect((res) => {
        expect(mockNluService.performNlu).toHaveBeenCalledTimes(1);
        expect(mockNluService.performNlu).toHaveBeenCalledWith(searchQuery);
        expect(mockMcpClientService.callTool).not.toHaveBeenCalled();
        expect(res.body.message).toContain("NLU Processing Failed"); // Check error message
      });
  });

  it('/api/v1/jobs/list (POST) - should handle MCP call failure', () => {
    const searchQuery = "some query causing mcp error";
    const mcpError = new Error("MCP Tool Call Failed");
    mockMcpClientService.callTool.mockRejectedValueOnce(mcpError);

    return request(app.getHttpServer())
      .post('/api/v1/jobs/list')
      .send({ query: searchQuery })
      .expect(500) // Assuming Internal Server Error for MCP failure
      .expect((res) => {
        expect(mockNluService.performNlu).toHaveBeenCalledTimes(1);
        expect(mockMcpClientService.callTool).toHaveBeenCalledTimes(1);
        expect(res.body.message).toContain("MCP Tool Call Failed"); // Check error message
      });
  });

  it('/api/v1/jobs/list (POST) - should handle missing query parameter', () => {
    return request(app.getHttpServer())
      .post('/api/v1/jobs/list')
      .send({}) // Send empty body
      .expect(400); // Assuming Bad Request for missing/invalid input
    // We might need a ValidationPipe enabled globally for this
    // .expect((res) => {
    //     expect(res.body.message).//toContain validation error details);
    // });
  });

  // Add more tests for edge cases, different inputs, etc.

}); 
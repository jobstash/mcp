import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { NluService } from './nlu.service';

// --- Mock OpenAI ---
const mockCreate = jest.fn();
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: mockCreate,
          },
        },
      };
    }),
    APIError: class MockAPIError extends Error { // Keep simple mock
        status?: number;
        type?: string;
        constructor(status?: number, type?: string, message?: string) {
            super(message || 'Mock API Error');
            this.status = status;
            this.type = type;
        }
    }
  };
});
const MockedOpenAI = OpenAI as jest.MockedClass<typeof OpenAI>;


// --- Mock ConfigService ---
const mockConfigGet = jest.fn();
const MockConfigServiceProvider = {
  provide: ConfigService,
  useValue: {
    get: mockConfigGet,
  },
};

describe('NluService', () => {
  let service: NluService;
  let configService: ConfigService;

  beforeEach(async () => {
    // Reset mocks before each test
    mockCreate.mockClear();
    mockConfigGet.mockClear();
    // (MockedOpenAI as jest.Mock).mockClear(); // REMOVE constructor clear

    const module: TestingModule = await Test.createTestingModule({
      providers: [NluService, MockConfigServiceProvider],
    }).compile();

    service = module.get<NluService>(NluService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock default config values for most tests
    mockConfigGet.mockImplementation((key: string, defaultValue?: any) => {
      if (key === 'OPENAI_API_KEY') return 'test-api-key';
      if (key === 'OPENAI_MODEL') return 'gpt-test';
      return defaultValue;
    });

    // Trigger initialization manually for testing purposes
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
      it('should initialize OpenAI client with API key from ConfigService', () => {
          // onModuleInit is called in beforeEach, so we check the mock calls
          expect(configService.get).toHaveBeenCalledWith('OPENAI_API_KEY');
          expect(MockedOpenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
      });

      it('should throw error if OPENAI_API_KEY is not configured', () => {
          // Re-configure mock specifically for this test
          mockConfigGet.mockImplementation((key: string) => {
              if (key === 'OPENAI_API_KEY') return undefined;
              return null;
          });
          expect(() => service.onModuleInit()).toThrow('OPENAI_API_KEY must be configured for NLU.');
      });
  });


  describe('performNlu', () => {
    const testQuery = 'find remote senior solidity jobs';
    const expectedArgs = { locations: ['Remote'], seniority: ['senior'], tags: ['solidity'] };

    it('should call OpenAI chat completions with correct parameters', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(expectedArgs) } }],
      });

      await service.performNlu(testQuery);

      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
        model: 'gpt-test', // From mock config
        messages: [
          { role: 'system', content: expect.any(String) }, // Check system prompt exists
          { role: 'user', content: testQuery },
        ],
        response_format: { type: 'json_object' },
      }));
      // Check system prompt content separately if needed
      const systemPrompt = mockCreate.mock.calls[0][0].messages.find(m => m.role === 'system').content;
      expect(systemPrompt).toContain("parsing job search queries");
      expect(systemPrompt).toContain("- 'locations': (string[], optional)");
    });

     it('should return parsed JSON object on successful completion', async () => {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: JSON.stringify(expectedArgs) } }],
      });

      const result = await service.performNlu(testQuery);
      expect(result).toEqual(expectedArgs);
    });

    it('should throw error if OpenAI response content is empty', async () => {
        mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: null } }] });
        await expect(service.performNlu(testQuery)).rejects.toThrow('Failed to extract parameters from query: Empty response from LLM.');
    });

    it('should throw error if LLM response is not valid JSON', async () => {
        mockCreate.mockResolvedValueOnce({ choices: [{ message: { content: 'this is not json' } }] });
        await expect(service.performNlu(testQuery)).rejects.toThrow('Failed to parse parameters from LLM response (Invalid JSON).');
    });

     it('should throw error if OpenAI API call fails', async () => {
        // Simplify mock error creation
        const apiError = new Error('Simulated API Failure'); 
        // Add properties if specific error handling depends on them later
        // (apiError as any).status = 500; 
        // (apiError as any).type = 'server_error';

        mockCreate.mockRejectedValueOnce(apiError);
        await expect(service.performNlu(testQuery)).rejects.toThrow(`NLU failed: ${apiError.message}`);
    });

  });
}); 
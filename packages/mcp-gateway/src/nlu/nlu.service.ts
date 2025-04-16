import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class NluService implements OnModuleInit {
  private readonly logger = new Logger(NluService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!openaiApiKey) {
      this.logger.error('OPENAI_API_KEY is not configured.');
      throw new Error('OPENAI_API_KEY must be configured for NLU.');
    }
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.logger.log('OpenAI client initialized for NLU Service.');
  }

  private buildNluSystemPrompt(): string {
    // Based on search_jobs_input_schema from @jobstash/mcp-server
    const instructions = [
      "You are an expert assistant specializing in parsing job search queries.",
      "Extract relevant parameters from the user's query and return them as a JSON object.",
      "Use the following keys for the extracted parameters:",
      "- 'query': (string, optional) Any remaining free-text parts of the query.",
      "- 'tags': (string[], optional) List of skills, technologies, or keywords mentioned.",
      "- 'locations': (string[], optional) List of locations mentioned. Use 'Remote' if remote work is specified.",
      "- 'companyNames': (string[], optional) List of specific company names mentioned.",
      "- 'seniority': (string[], optional) List of experience levels mentioned (e.g., 'junior', 'senior', 'lead').",
      "- 'salaryMin': (integer, optional) Minimum desired salary mentioned.",
      "- 'salaryMax': (integer, optional) Maximum desired salary mentioned.",
      "- 'equity': (boolean, optional) Whether the user mentioned requiring equity.",
      "If a parameter is not mentioned in the query, omit its key from the JSON object.",
      "Ensure the output is a valid JSON object."
    ];
    return instructions.join('\n');
  }

  async performNlu(query: string): Promise<Record<string, any>> {
    this.logger.log(`Performing NLU for query: "${query}"`);
    const systemPrompt = this.buildNluSystemPrompt();

    try {
      const completion = await this.openai.chat.completions.create({
        // TODO: Make model configurable via ConfigService
        model: this.configService.get<string>('OPENAI_MODEL', 'gpt-4o'),
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: query,
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        this.logger.error('NLU Error: OpenAI response content is empty.');
        throw new Error('Failed to extract parameters from query: Empty response from LLM.');
      }

      this.logger.debug(`Raw LLM response content: ${content}`);

      try {
        const parsedContent = JSON.parse(content);
        this.logger.log(`NLU successful, extracted args: ${JSON.stringify(parsedContent)}`);
        return parsedContent;
      } catch (parseError) {
        this.logger.error(`NLU Error: Failed to parse LLM response as JSON: ${parseError}. Response: ${content}`);
        throw new Error('Failed to parse parameters from LLM response (Invalid JSON).');
      }

    } catch (error) {
      this.logger.error(`NLU Error: Failed to get structured data from OpenAI: ${error.message}`, error.stack);
      // Improve error reporting (e.g., check for specific OpenAI API errors)
      throw new Error(`NLU failed: ${error.message}`);
    }
  }
} 
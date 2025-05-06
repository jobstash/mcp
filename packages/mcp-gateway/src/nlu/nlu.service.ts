import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { UserProfile } from '../common/dtos/user-profile.dto';
import { CvJobData } from '../common/dtos/cv-job-data.dto';

@Injectable()
export class NluService implements OnModuleInit {
  private readonly logger = new Logger(NluService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) { }

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

  // --- New Method for CV Data Extraction ---

  private buildCvNluSystemPrompt(): string {
    // Placeholder prompt - needs significant refinement
    const instructions = [
      "You are an expert assistant specializing in parsing CV/Resume documents.",
      "Analyze the provided CV text and extract two distinct JSON objects: 'cvJobData' and 'userProfile'.",
      "Return a single JSON object containing these two keys: { \"cvJobData\": {...}, \"userProfile\": {...} }.",

      "For 'cvJobData', extract job-related information using these keys:",
      "- skills: string[] (technical skills, tools, software)",
      "- jobTitles: string[] (relevant past or desired job titles)",
      "- locations: string[] (location preferences, including 'Remote')",
      "- seniorityKeywords: string[] (keywords like 'senior', 'lead', 'manager', 'principal')",
      "- yearsExperience: number (estimated total years of relevant experience)",
      "- companyNames: string[] (companies worked at)",
      "- educationLevel: string (highest level achieved, e.g., 'Bachelor\'s', 'Master\'s')",
      // Omit 'fullCvText' extraction here unless specifically needed later
      "Omit keys if the information is not found.",

      "For 'userProfile', extract personal and contact information using these keys:",
      "- name: string | null (full name)",
      "- location: { country: string | null, city: string | null } | null (current location)",
      "- alternateEmails: string[] (list of email addresses found, excluding primary if possible)",
      "- linkedAccounts: { discord, telegram, github, twitter, google, apple, farcaster, email, wallets } | null",
      "  - For linkedAccounts, extract relevant usernames, URLs, primary email, and crypto wallet addresses.",
      "Omit keys if the information is not found.",

      "Ensure the final output is a single, valid JSON object containing the 'cvJobData' and 'userProfile' keys with their respective structured data or null/empty values if nothing is found."
    ];
    return instructions.join('\n');
  }

  async extractCvData(cvText: string): Promise<{ cvJobData: CvJobData | null, userProfile: UserProfile | null }> {
    this.logger.log(`Performing NLU for CV text (length: ${cvText.length})...`);
    const systemPrompt = this.buildCvNluSystemPrompt();

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.configService.get<string>('OPENAI_MODEL', 'gpt-4o'), // Use same configurable model
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: cvText, // Pass the full CV text
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        this.logger.error('CV NLU Error: OpenAI response content is empty.');
        throw new Error('Failed to extract data from CV: Empty response from LLM.');
      }

      this.logger.debug(`Raw CV LLM response content: ${content}`);

      try {
        const parsedContent = JSON.parse(content);
        // Basic validation (can be enhanced with Zod later if needed)
        const result = {
          cvJobData: parsedContent?.cvJobData || null,
          userProfile: parsedContent?.userProfile || null
        };
        this.logger.log(`CV NLU successful, extracted: ${JSON.stringify(result)}`);
        return result;
      } catch (parseError) {
        this.logger.error(`CV NLU Error: Failed to parse LLM response as JSON: ${parseError}. Response: ${content}`);
        throw new Error('Failed to parse CV data from LLM response (Invalid JSON).');
      }

    } catch (error) {
      this.logger.error(`CV NLU Error: Failed to get structured data from OpenAI: ${error.message}`, error.stack);
      throw new Error(`CV NLU failed: ${error.message}`);
    }
  }

} 
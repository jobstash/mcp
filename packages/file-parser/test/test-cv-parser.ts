import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { OpenAIFileParserService } from '../src/openai-file-parser.service';
import { FileParserInput } from '../src/file-parser.interface';
// We don't need the full ConfigService, just a way to provide the config values.
// Logger from @nestjs/common can be instantiated directly.
import { Logger } from '@nestjs/common';


// Load environment variables from .env file at the project root
const envPath = path.resolve(__dirname, '../../../.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`.env file loaded from ${envPath}`);
} else {
    console.warn(`.env file not found at ${envPath}. Relying on environment variables already being set.`);
}

// Minimal mock for ConfigService's get method
class MockConfigService {
    private envConfig: Record<string, string | undefined>;

    constructor() {
        this.envConfig = {
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
            OPENAI_ASSISTANT_ID_PARSER: process.env.OPENAI_ASSISTANT_ID_PARSER,
        };

        if (!this.envConfig.OPENAI_API_KEY) {
            console.error("Error: OPENAI_API_KEY is not set. Please ensure it's in your .env file or environment variables.");
            process.exit(1);
        }
        if (!this.envConfig.OPENAI_ASSISTANT_ID_PARSER) {
            console.error("Error: OPENAI_ASSISTANT_ID_PARSER is not set. Please ensure it's in your .env file or environment variables.");
            process.exit(1);
        }
    }

    get<T = any>(key: string): T {
        const value = this.envConfig[key];
        if (value === undefined) {
            // OpenAIFileParserService constructor logs an error and throws if keys are missing,
            // but this is a safeguard or for other potential keys.
            console.warn(`MockConfigService: Key "${key}" not found.`);
        }
        return value as T;
    }
}

// Main function to run the test
async function testParseCV() {
    const cvFilePath = path.resolve(__dirname, '../../../packages/file-parser/test/test_cvs/test_cv_1.pdf');

    if (!fs.existsSync(cvFilePath)) {
        console.error(`Error: CV file not found at ${cvFilePath}`);
        process.exit(1);
    }

    console.log(`Using CV file: ${cvFilePath}`);

    const mockConfigService = new MockConfigService();

    // Instantiate the parser service
    // The OpenAIFileParserService instantiates its own NestJS Logger.
    let parserService: OpenAIFileParserService;
    try {
        // Casting mockConfigService to 'any' then to 'ConfigService' from @nestjs/config
        // if strict type checking causes issues with the simplified mock.
        // However, since we only use the 'get' method, this should be fine.
        parserService = new OpenAIFileParserService(mockConfigService as any);
        console.log('OpenAIFileParserService instantiated.');
    } catch (e) {
        console.error("Failed to instantiate OpenAIFileParserService:", e);
        process.exit(1);
    }

    const fileBuffer = fs.readFileSync(cvFilePath);
    const originalname = path.basename(cvFilePath);

    // Determine mimetype.
    let mimetype = 'application/octet-stream'; // Default for unknown binary
    if (originalname.endsWith('.txt')) {
        mimetype = 'text/plain';
    } else if (originalname.endsWith('.md')) {
        mimetype = 'text/markdown';
    } else if (originalname.endsWith('.pdf')) {
        mimetype = 'application/pdf';
    }
    // Add other common CV mimetypes if needed
    // The current service implementation will send non-'text/plain' files to OpenAI

    const inputFile: FileParserInput = {
        buffer: fileBuffer,
        originalname: originalname,
        mimetype: mimetype,
    };

    console.log(`Attempting to parse ${inputFile.originalname} (${inputFile.mimetype}, ${inputFile.buffer.length} bytes)...`);

    try {
        const parsedText = await parserService.parse(inputFile);
        console.log("\n--- Parsed CV Text ---");
        console.log(parsedText);
        console.log("\n--- End of Parsed Text ---");
    } catch (error) {
        console.error("\n--- Error during parsing ---");
        if (error instanceof Error) {
            console.error(`Message: ${error.message}`);
            if (error.stack) {
                console.error(`Stack: ${error.stack}`);
            }
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}

// Run the test
testParseCV().then(() => {
    console.log("\nTest script finished successfully.");
}).catch(error => {
    // This catch is for unhandled errors from testParseCV itself, though most are caught within.
    console.error("\nTest script failed with an unhandled critical error:", error);
    process.exit(1);
}); 
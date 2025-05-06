import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAIFileParserService } from './openai-file-parser.service';
import { FILE_PARSER_SERVICE } from './file-parser.constants';

@Module({
    imports: [
        // Ensure ConfigModule is imported if this module is used standalone
        // If always imported via AppModule where ConfigModule is global, this might not be needed here
        // ConfigModule, 
    ],
    providers: [
        {
            provide: FILE_PARSER_SERVICE,
            useClass: OpenAIFileParserService, // Provide the OpenAI implementation
        },
        // ConfigService is automatically available if ConfigModule is global or imported
    ],
    exports: [
        FILE_PARSER_SERVICE, // Export the token so other modules can inject the service
    ],
})
export class FileParserModule { } 
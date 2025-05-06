import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIFileParserService } from './openai-file-parser.service';
import { FILE_PARSER_SERVICE } from './file-parser.constants';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: FILE_PARSER_SERVICE,
            useClass: OpenAIFileParserService,
        },
        OpenAIFileParserService,
    ],
    exports: [
        FILE_PARSER_SERVICE,
        OpenAIFileParserService,
    ],
})
export class FileParserModule { } 
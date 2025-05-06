import { Module } from '@nestjs/common';
import { OpenAIFileParserService } from './openai-file-parser.service';
import { FILE_PARSER_SERVICE } from './file-parser.constants';

@Module({
    imports: [],
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
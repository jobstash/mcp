import { Module } from '@nestjs/common';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';
import { FileParserModule } from '@jobstash/file-parser';
import { CvParsingController } from './cv-parsing.controller';
import { CvParsingService } from './cv-parsing.service';
// TODO: Potentially import MulterModule if needed for advanced config
// import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        NluModule, // Need NluService for extraction
        McpClientModule, // Need McpClientService to call MCP tool
        FileParserModule, // For OpenAIFileParserService (or the token)
        // MulterModule.register({ /* options */ }), // Register if needed
    ],
    controllers: [CvParsingController],
    providers: [CvParsingService]
})
export class CvParsingModule { } 
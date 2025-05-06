# @jobstash/file-parser

This package provides a service for parsing file content, primarily designed to extract text from documents like CVs using OpenAI's capabilities.

## Overview

The core component is the `OpenAIFileParserService`, which handles the interaction with the OpenAI API to process files.

## Installation

This package is part of the JobStash MCP monorepo. Dependencies are managed by Yarn workspaces.

## Usage

To use the file parser service in a NestJS application:

1.  **Import `FileParserModule`:**
    Add `FileParserModule` to the `imports` array of your target module.

    ```typescript
    // your-feature.module.ts
    import { Module } from '@nestjs/common';
    import { FileParserModule } from '@jobstash/file-parser'; // Adjust path if using relative paths

    @Module({
      imports: [FileParserModule],
      // ... other providers, controllers
    })
    export class YourFeatureModule {}
    ```

2.  **Inject and use `OpenAIFileParserService` (or `FILE_PARSER_SERVICE` token):**

    ```typescript
    // your-feature.service.ts
    import { Injectable, Inject } from '@nestjs/common';
    import { OpenAIFileParserService, FileParserInput, FILE_PARSER_SERVICE } from '@jobstash/file-parser'; // Adjust path

    @Injectable()
    export class YourFeatureService {
      constructor(
        // Option 1: Inject by class name
        private readonly fileParser: OpenAIFileParserService,
        // Option 2: Inject by token (if preferred)
        // @Inject(FILE_PARSER_SERVICE) private readonly fileParser: OpenAIFileParserService
      ) {}

      async parseMyFile(fileBuffer: Buffer, originalname: string, mimetype: string): Promise<string> {
        const input: FileParserInput = {
          buffer: fileBuffer,
          originalname,
          mimetype,
        };
        try {
          const extractedText = await this.fileParser.parse(input);
          console.log('Extracted Text:', extractedText);
          return extractedText;
        } catch (error) {
          console.error('Error parsing file:', error);
          throw error;
        }
      }
    }
    ```

## Configuration

The `OpenAIFileParserService` requires the following environment variables to be set:

-   `OPENAI_API_KEY`: Your OpenAI API key.
-   `OPENAI_ASSISTANT_ID_PARSER`: The ID of the OpenAI Assistant configured for file parsing.

**Note:** The OpenAI Assistant (specified by `OPENAI_ASSISTANT_ID_PARSER`) should ideally be configured on the OpenAI platform to have a default response format of `text`. Alternatively, the service itself requests a text response, but aligning the assistant's default can prevent potential conflicts or ensure clarity.

These are typically loaded via a `.env` file and accessed through NestJS `ConfigService`. 
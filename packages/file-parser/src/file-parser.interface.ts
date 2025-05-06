export interface FileParserInput {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}

export interface FileParser {
    /**
     * Parses the content of a file buffer into text.
     * @param input Object containing file buffer, mimetype, and original name.
     * @returns A promise that resolves with the extracted text content.
     * @throws Throws an error if parsing fails.
     */
    parse(input: FileParserInput): Promise<string>;
} 
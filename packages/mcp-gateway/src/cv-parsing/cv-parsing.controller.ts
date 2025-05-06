import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    FileTypeValidator,
    MaxFileSizeValidator,
    Logger,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvParsingService } from './cv-parsing.service';
import { Express } from 'express'; // For Multer file type

// Example: Define file size and type constants
const MAX_CV_SIZE_MB = 5;
const MAX_CV_SIZE_BYTES = MAX_CV_SIZE_MB * 1024 * 1024;
// Adjust allowed MIME types as needed (PDF, DOCX, potentially plain text)
const ALLOWED_CV_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain',
];

@Controller('api/v1/cv/parse')
export class CvParsingController {
    private readonly logger = new Logger(CvParsingController.name);

    constructor(private readonly cvParsingService: CvParsingService) { }

    @Post()
    @UseInterceptors(FileInterceptor('cv')) // 'cv' is the field name in form-data
    async parseCv(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: MAX_CV_SIZE_BYTES }),
                    new FileTypeValidator({ fileType: new RegExp(`^(${ALLOWED_CV_MIME_TYPES.join('|')})$`) }),
                ],
                fileIsRequired: true, // Ensure a file is actually uploaded
            }),
        )
        file: Express.Multer.File,
    ) {
        this.logger.log(`Received CV file upload request: ${file.originalname}`);
        try {
            const result = await this.cvParsingService.handleCvUpload(file);
            return result; // Returns { jobstashUrl, userProfile }
        } catch (error) {
            // Catch specific errors if needed, otherwise rethrow standard HttpExceptions
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error(`Unexpected error during CV processing: ${error.message}`, error.stack);
            throw new HttpException('Internal server error during CV processing', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 
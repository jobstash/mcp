import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvParsingService } from './cv-parsing.service';
import type { Express } from 'express'; // For Multer.File type
import { UserProfile } from '../common/dtos/user-profile.dto';

// Define a DTO for the response to ensure consistency
export class CvParseResponseDto {
    jobstashUrl: string | null;
    userProfile: UserProfile | null;
}

@Controller('cv') // Assuming the route base is /api/v1/cv from the plan
export class CvParsingController {
    private readonly logger = new Logger(CvParsingController.name);

    constructor(private readonly cvParsingService: CvParsingService) { }

    @Post('parse')
    @UseInterceptors(FileInterceptor('cv')) // 'cv' is the field name for the file in form-data
    async parseCv(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    //TODO: make file size configurable
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
                    new FileTypeValidator({ fileType: '(pdf|doc|docx|txt|md)' }), // Allowed file types regex
                ],
                fileIsRequired: true,
            }),
        )
        file: Express.Multer.File,
    ): Promise<CvParseResponseDto> {
        this.logger.log(`Received file for parsing: ${file.originalname}, type: ${file.mimetype}, size: ${file.size} bytes`);

        if (!file) {
            this.logger.error('No file uploaded.');
            throw new HttpException('No file uploaded.', HttpStatus.BAD_REQUEST);
        }

        try {
            const result = await this.cvParsingService.handleCvUpload(file);
            this.logger.log(`Successfully processed CV: ${file.originalname}`);
            return result;
        } catch (error) {
            this.logger.error(`Error during CV processing for ${file.originalname}: ${error.message}`, error.stack);
            // Determine appropriate HTTP status based on error type if possible
            if (error.message.includes('Error parsing CV file') || error.message.includes('Error processing CV content')) {
                throw new HttpException(`Failed to process CV content: ${error.message}`, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            throw new HttpException('An unexpected error occurred while processing the CV.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 
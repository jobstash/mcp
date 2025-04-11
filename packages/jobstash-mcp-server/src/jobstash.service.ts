import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class JobstashService {
  private readonly logger = new Logger(JobstashService.name);
  private readonly jobstashApiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.jobstashApiBaseUrl = this.configService.get<string>(
      'JOBSTASH_API_BASE_URL',
      'https://middleware.jobstash.xyz', // Default value
    );
    this.logger.log(`JobStash API Base URL: ${this.jobstashApiBaseUrl}`);
  }

  /**
   * Calls the /jobs/list endpoint of the JobStash API.
   * @param params Query parameters for the API call.
   * @returns The response data from the API.
   */
  async searchJobs(params: Record<string, any>): Promise<any> {
    const url = `${this.jobstashApiBaseUrl}/jobs/list`;
    this.logger.log(`Searching jobs with params: ${JSON.stringify(params)} at ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get(url, {
            params,
            headers: { Accept: 'application/json' },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                `Error fetching jobs from JobStash API: ${error.response?.status} ${error.message}`,
                error.response?.data ? JSON.stringify(error.response.data) : '',
                error.stack,
              );
              throw new Error(
                `Failed to fetch jobs from JobStash API: ${error.message}`,
              );
            }),
          ),
      );
      this.logger.log(`Successfully fetched ${data?.data?.length ?? 0} jobs from JobStash API`);
      return data;
    } catch (error) {
      this.logger.error(
        `Failed call to JobStash API: ${error.message}`,
        error.stack,
      );
      throw error; // Re-throw the error to be handled by the calling controller
    }
  }
} 
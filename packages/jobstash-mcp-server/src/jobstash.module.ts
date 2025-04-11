import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JobstashService } from './jobstash.service.js';

@Module({
  imports: [HttpModule],
  providers: [JobstashService],
  exports: [JobstashService],
})
export class JobstashModule {} 
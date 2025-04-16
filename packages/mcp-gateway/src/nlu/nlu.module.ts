import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NluService } from './nlu.service';

@Module({
  imports: [ConfigModule],
  providers: [NluService],
  exports: [NluService],
})
export class NluModule {} 
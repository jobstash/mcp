import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueryModule } from './query.module';
import { StructuredDataModule } from './structured-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    QueryModule,
    StructuredDataModule,
  ],
})
export class AppModule {}

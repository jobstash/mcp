import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => { // Use beforeAll as the app setup is needed once per suite
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => { // Add afterAll to close the app connection
    await app.close();
  });

  // Test for POST /api/v1/query
  describe('/api/v1/query (POST)', () => {
    it('should process a query and return a JobStash URL', () => {
      const query = 'Remote backend developer';
      return request(app.getHttpServer())
        .post('/api/v1/query')
        .send({ query })
        .expect(201) // Assuming POST requests return 201 Created
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.jobstashUrl).toBeDefined();
          expect(typeof res.body.jobstashUrl).toBe('string');
          expect(res.body.jobstashUrl).toContain('https://jobstash.xyz/jobs');
          // Add more specific checks based on expected parameters if needed
        });
    });

    it('should return 400 for missing query', () => {
      return request(app.getHttpServer())
        .post('/api/v1/query')
        .send({}) // Send empty body
        .expect(400); // Expect Bad Request
    });
  });

  // Test for POST /api/v1/structured-data/extract-params
  describe('/api/v1/structured-data/extract-params (POST)', () => {
    it('should process a query and return structured parameters', () => {
      const query = 'Senior frontend engineer in Berlin';
      return request(app.getHttpServer())
        .post('/api/v1/structured-data/extract-params')
        .send({ query })
        .expect(201) // Assuming POST requests return 201 Created
        .expect((res) => {
          expect(res.body).toBeDefined();
          // Check for expected properties based on the query and filters.json
          // Example:
          expect(res.body.seniority).toBeDefined();
          expect(res.body.locations).toBeDefined();
          // Add more specific checks...
        });
    });

     it('should return 400 for missing query', () => {
      return request(app.getHttpServer())
        .post('/api/v1/structured-data/extract-params')
        .send({}) // Send empty body
        .expect(400); // Expect Bad Request
    });
  });
});

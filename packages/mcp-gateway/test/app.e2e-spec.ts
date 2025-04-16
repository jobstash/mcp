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

  // Test for POST /api/v1/parameters/extract
  describe('/api/v1/parameters/extract (POST)', () => {
    it('should process a query and return structured parameters', () => {
      const query = 'Senior frontend engineer in Berlin';
      return request(app.getHttpServer())
        .post('/api/v1/parameters/extract')
        .send({ query })
        .expect(201)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(typeof res.body).toBe('object');

          // TODO: LLM variability currently yields either 'seniority' or 'job_title' for queries like "Senior ...".
          // This test allows either key but consistency should be improved later (See PROJECT_PLAN.md).
          const hasSeniority = res.body.hasOwnProperty('seniority');
          const hasJobTitle = res.body.hasOwnProperty('job_title');
          expect(hasSeniority || hasJobTitle).toBe(true); // Ensure at least one key exists

          // Check the value associated with the key that exists starts with "Senior"
          let relevantValue = hasSeniority ? res.body.seniority : res.body.job_title;
          expect(relevantValue).toBeDefined();
          expect(String(relevantValue).toLowerCase().startsWith('senior')).toBe(true);

          // Location seems consistent, check value too.
          expect(res.body.locations).toBeDefined(); 
          expect(res.body.locations).toBe('Berlin'); // Check value too
        });
    });

     it('should return 400 for missing query', () => {
      return request(app.getHttpServer())
        .post('/api/v1/parameters/extract')
        .send({})
        .expect(400);
    });
  });
});

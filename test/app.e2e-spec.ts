import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // if not add useGlobalPipes forbidNonWhitelisted and transform will not work
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // If set to true validator will strip validated object of any properties that do not have any decorators.
        forbidNonWhitelisted: true, // If set to true, instead of stripping non-whitelisted properties validator will throw an error
        transform: true, // change the type of params/query/body to the type you set
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello, World!');
  });

  describe('/movies', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('/ (POST)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'] })
        .expect(201);
    });

    it('/ (DELETE)', () => {
      return request(app.getHttpServer()).delete('/999').expect(404);
    });
  });

  describe('/movie/:id', () => {
    // it.todo('GET');
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  });
});

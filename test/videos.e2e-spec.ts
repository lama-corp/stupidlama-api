import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { VideosModule } from '../src/videos/videos.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../src/shared/database/database.service';
import { DatabaseModule } from '../src/shared/database/database.module';
import { videoStub } from './stubs/video.stub';

describe('VideoController e2e', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: any;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true,
        }),
        DatabaseModule,
        VideosModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  beforeEach(async () => {
    await dbConnection.collection('videos').deleteMany({});
  });

  it('/videos (GET)', () => {
    return request(httpServer).get('/videos').expect(200).expect([]);
  });

  it('/videos (POST)', () => {
    return request(httpServer)
      .post('/videos')
      .send(Object.assign({}, videoStub))
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(videoStub));
      });
  });
});

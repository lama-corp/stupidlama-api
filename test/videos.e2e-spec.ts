import * as request from 'supertest';
import { Connection } from 'mongoose';
import {
  importVideoDtoStub,
  videoFalsyStub,
  videoStub,
} from './stubs/video.stub';
import { initTestingModule } from './utils/module-mount.util';
import { VideosModule } from '../src/videos/videos.module';

describe('VideoController e2e', () => {
  let dbConnection: Connection;
  let httpServer: any;

  beforeAll(async () => {
    const result: any = await initTestingModule(VideosModule);
    dbConnection = result.dbConnection;
    httpServer = result.httpServer;
  });

  beforeEach(async () => {
    await dbConnection.collection('videos').deleteMany({});
  });

  it('/videos (GET many)', async () => {
    await dbConnection.collection('videos').insertOne(videoStub);
    const response = await request(httpServer).get('/videos');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([videoStub]);
  });

  it('/videos/:id (GET one)', async () => {
    await dbConnection.collection('videos').insertOne(videoStub);
    const response = await request(httpServer).get(`/videos/${videoStub.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(videoStub);
  });

  it('/videos/import-from-platform (POST)', async () => {
    return request(httpServer)
      .post('/videos/import-from-platform')
      .send(Object.assign({}, importVideoDtoStub))
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: videoStub.title,
            categoryId: videoStub.categoryId,
          }),
        );
      });
  });

  it('/videos/:id/hide (put - hide)', async () => {
    await dbConnection.collection('videos').insertOne(videoStub);
    const video = await dbConnection
      .collection('videos')
      .findOne({ id: videoStub.id });
    expect(video.hidden).toBe(false);

    return request(httpServer)
      .put(`/videos/${videoStub.id}/hide`)
      .expect(204)
      .then(async () => {
        const video = await dbConnection
          .collection('videos')
          .findOne({ id: videoStub.id });
        expect(video.hidden).toBe(true);
      });
  });

  it('/videos/:id/show (put - display)', async () => {
    await dbConnection
      .collection('videos')
      .insertOne({ ...videoStub, hidden: true });
    const video = await dbConnection
      .collection('videos')
      .findOne({ id: videoStub.id });
    expect(video.hidden).toBe(true);

    return request(httpServer)
      .put(`/videos/${videoStub.id}/show`)
      .expect(204)
      .then(async () => {
        const video = await dbConnection
          .collection('videos')
          .findOne({ id: videoStub.id });
        expect(video.hidden).toBe(false);
      });
  });

  it('/videos/:id/refresh-from-platform (put - refreshData)', async () => {
    // All fields are not tested as some of them change through time (stats for example)
    await dbConnection.collection('videos').insertOne(videoFalsyStub);

    const video = await dbConnection
      .collection('videos')
      .findOne({ id: videoStub.id });
    expect(video.title).toBe('test');

    return request(httpServer)
      .put(`/videos/${videoStub.id}/refresh-from-platform`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            title: videoStub.title,
            categoryId: videoStub.categoryId,
          }),
        );
      });
  });
});

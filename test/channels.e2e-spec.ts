import * as request from 'supertest';
import { ChannelsModule } from '../src/channels/channels.module';
import { initTestingModule } from './utils/module-mount.util';
import { Connection } from 'mongoose';
import {
  importChannelDtoStub,
  channelFalsyStub,
  channelStub,
} from './stubs/channel.stub';

describe('ChannelController e2e', () => {
  let dbConnection: Connection;
  let httpServer: any;

  beforeAll(async () => {
    const result: any = await initTestingModule(ChannelsModule);
    dbConnection = result.dbConnection;
    httpServer = result.httpServer;
  });

  beforeEach(async () => {
    await dbConnection.collection('channels').deleteMany({});
  });

  it('/channels (GET many)', async () => {
    await dbConnection.collection('channels').insertOne(channelStub);
    const response = await request(httpServer).get('/channels');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([channelStub]);
  });

  it('/channels/:id (GET one)', async () => {
    await dbConnection.collection('channels').insertOne(channelStub);
    const response = await request(httpServer).get(
      `/channels/${channelStub.id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(channelStub);
  });

  it('/channels/import-from-platform (POST)', async () => {
    return request(httpServer)
      .post('/channels/import-from-platform')
      .send(Object.assign({}, importChannelDtoStub))
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: channelStub.name,
          }),
        );
      });
  });

  it('/channels/:id/hide (put - hide)', async () => {
    await dbConnection.collection('channels').insertOne(channelStub);
    const channel = await dbConnection
      .collection('channels')
      .findOne({ id: channelStub.id });
    expect(channel.hidden).toBe(false);

    return request(httpServer)
      .put(`/channels/${channelStub.id}/hide`)
      .expect(204)
      .then(async () => {
        const channel = await dbConnection
          .collection('channels')
          .findOne({ id: channelStub.id });
        expect(channel.hidden).toBe(true);
      });
  });

  it('/channels/:id/show (put - display)', async () => {
    await dbConnection
      .collection('channels')
      .insertOne({ ...channelStub, hidden: true });
    const channel = await dbConnection
      .collection('channels')
      .findOne({ id: channelStub.id });
    expect(channel.hidden).toBe(true);

    return request(httpServer)
      .put(`/channels/${channelStub.id}/show`)
      .expect(204)
      .then(async () => {
        const channel = await dbConnection
          .collection('channels')
          .findOne({ id: channelStub.id });
        expect(channel.hidden).toBe(false);
      });
  });

  it('/channels/:id/refresh-from-platform (put - refreshData)', async () => {
    // All fields are not tested as some of them change through time (stats for example)
    await dbConnection.collection('channels').insertOne(channelFalsyStub);

    const channel = await dbConnection
      .collection('channels')
      .findOne({ id: channelStub.id });
    expect(channel.name).toBe('Lama Raging');

    return request(httpServer)
      .put(`/channels/${channelStub.id}/refresh-from-platform`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: channelStub.name,
          }),
        );
      });
  });
});

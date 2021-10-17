import { INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../src/shared/database/database.module';
import { DatabaseService } from '../../src/shared/database/database.service';

export const initTestingModule = async (module: any) => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: any;

  const moduleFixture = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: ['.env'],
        isGlobal: true,
      }),
      DatabaseModule,
      module,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  dbConnection = moduleFixture
    .get<DatabaseService>(DatabaseService)
    .getDbHandle();
  httpServer = app.getHttpServer();

  return {
    app,
    dbConnection,
    httpServer,
  };
};

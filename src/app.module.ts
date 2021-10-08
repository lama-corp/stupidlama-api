import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { VideoModule } from './video/video.module';
import { CreatorModule } from './creator/creator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/lama'),
    SharedModule,
    VideoModule,
    CreatorModule,
  ],
})
export class AppModule {}

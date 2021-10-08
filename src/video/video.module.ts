import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosController } from './video.controller';
import { VideosService } from './video.service';
import { Video, VideoSchema } from './video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideoModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video, VideosSchema } from './videos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideosSchema }]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}

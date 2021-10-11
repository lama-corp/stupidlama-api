import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video, VideosSchema } from './videos.schema';
import { VideosRepository } from './videos.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideosSchema }]),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule {}

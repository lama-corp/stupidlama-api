import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelsSchema } from './channels.schema';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { ChannelsRepository } from './channels.repository';
import { YoutubeService } from '../shared/youtube/youtube.service';
import { YoutubeMapper } from '../shared/youtube/youtube.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelsSchema }]),
  ],
  controllers: [ChannelsController],
  providers: [
    ChannelsService,
    ChannelsRepository,
    YoutubeService,
    YoutubeMapper,
  ],
})
export class ChannelsModule {}

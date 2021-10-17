import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeModule {}

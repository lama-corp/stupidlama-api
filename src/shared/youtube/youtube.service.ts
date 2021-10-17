import { Injectable } from '@nestjs/common';
import { YoutubeDataAPI } from 'youtube-v3-api';
import { YoutubeMapper } from './youtube.mapper';
import { VideoDto } from '../../videos/dto/video.dto';
import { ChannelDto } from '../../channels/dto/channel.dto';

@Injectable()
export class YoutubeService {
  constructor(private readonly youtubeMapper: YoutubeMapper) {}

  async getVideo(videoId: string): Promise<VideoDto> {
    const api = new YoutubeDataAPI(process.env.GCP_KEY);
    const response: any = await api.searchVideo(videoId);

    return this.youtubeMapper.mapResponseToVideo(response);
  }

  async getChannel(channelId: string): Promise<ChannelDto> {
    const api = new YoutubeDataAPI(process.env.GCP_KEY);
    const response: any = await api.searchChannel(channelId);

    return this.youtubeMapper.mapResponseToChannel(response);
  }
}

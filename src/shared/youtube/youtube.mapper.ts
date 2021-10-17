import { Injectable } from '@nestjs/common';
import { VideoDto } from '../../videos/dto/video.dto';
import { ChannelDto } from '../../channels/dto/channel.dto';

@Injectable()
export class YoutubeMapper {
  mapResponseToVideo(response: any): VideoDto {
    const data: any = response.items[0];

    return {
      platformId: data.id,
      // platform.creatorId: video.channelId,
      // platform.name: 'youtube',
      title: data.snippet.title,
      description: data.snippet.description,
      categoryId: data.snippet.categoryId,
      publishedAt: data.snippet.publishedAt,
      viewCount: data.statistics.viewCount,
      likeCount: data.statistics.likeCount,
      dislikeCount: data.statistics.dislikeCount,
    };
  }

  mapResponseToChannel(response: any): ChannelDto {
    const data: any = response.items[0];

    return {
      platformId: data.id,
      // platform.creatorId: video.channelId,
      // platform.name: 'youtube',
      name: data.snippet.title,
      description: data.snippet.description,
      joinedAt: data.snippet.publishedAt,
      nbSubscribers: data.statistics.subscriberCount,
      nbVideos: data.statistics.videoCount,
      nbViews: data.statistics.viewCount,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { YoutubeDataAPI } from 'youtube-v3-api';
import { YoutubeVideo, YoutubeVideoStatistics } from './app.types';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  mapYoutubeVideoStatisticsResponse(response: any): YoutubeVideoStatistics {
    return {
      viewCount: parseInt(response.viewCount),
      likeCount: parseInt(response.likeCount),
      dislikeCount: parseInt(response.dislikeCount),
      favoriteCount: parseInt(response.favoriteCount),
      commentCount: parseInt(response.commentCount),
    };
  }

  mapYoutubeVideoResponse(response: any): YoutubeVideo {
    const data: any = response.items[0];

    return {
      id: response.items[0].id,
      channelId: data.snippet.channelId,
      title: data.snippet.title,
      description: data.snippet.description,
      publishedAt: data.snippet.publishedAt,
      categoryId: parseInt(data.snippet.categoryId),
      statistics: this.mapYoutubeVideoStatisticsResponse(
        response.items[0].statistics,
      ),
    };
  }

  async getYoutubeVideo(videoId: string): Promise<YoutubeVideo> {
    const api = new YoutubeDataAPI(process.env.GCP_KEY);
    const result: any = await api.searchVideo(videoId);

    return this.mapYoutubeVideoResponse(result);
  }
}

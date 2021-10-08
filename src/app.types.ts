export interface YoutubeVideoStatistics {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;
}

export interface YoutubeVideo {
  id: string;
  channelId: string;
  title: string;
  description: string;
  publishedAt: string;
  categoryId: number;
  statistics: YoutubeVideoStatistics;
}

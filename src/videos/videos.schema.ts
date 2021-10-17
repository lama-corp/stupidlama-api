import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  id: string;

  @Prop()
  platformId: string;

  @Prop()
  title: string;

  @Prop()
  hidden: boolean;

  @Prop()
  description: string;

  @Prop()
  publishedAt: string;

  @Prop()
  categoryId: number;

  @Prop()
  viewCount: number;

  @Prop()
  likeCount: number;

  @Prop()
  dislikeCount: number;
}

export const VideosSchema = SchemaFactory.createForClass(Video);

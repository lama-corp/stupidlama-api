import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  viewCount: number;

  @Prop()
  likeCount: number;

  @Prop()
  dislikeCount: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  publishedAt: string;

  @Prop()
  categoryId: number;
}

export const VideosSchema = SchemaFactory.createForClass(Video);

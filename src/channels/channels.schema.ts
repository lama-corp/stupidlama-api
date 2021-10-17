import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop()
  id: string;

  @Prop()
  platformId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  hidden: boolean;

  @Prop()
  joinedAt: string;

  @Prop()
  nbSubscribers: number;
}

export const ChannelsSchema = SchemaFactory.createForClass(Channel);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Channel, ChannelDocument } from './channels.schema';
import { ChannelDto } from './dto/channel.dto';
import { Video, VideoDocument } from '../videos/videos.schema';

@Injectable()
export class ChannelsRepository {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<ChannelDocument>,
  ) {}

  async findOne(
    channelFilterQuery: FilterQuery<ChannelDocument>,
  ): Promise<Channel> {
    return this.channelModel.findOne(channelFilterQuery);
  }

  async find(
    channelsFilterQuery: FilterQuery<ChannelDocument>,
  ): Promise<Channel[]> {
    return this.channelModel.find(channelsFilterQuery);
  }

  async create(channelDto: ChannelDto): Promise<Channel> {
    const channel = new this.channelModel(channelDto);
    return channel.save();
  }

  async findOneAndUpdate(
    channelFilterQuery: FilterQuery<ChannelDocument>,
    channel: Partial<Channel>,
  ): Promise<Channel> {
    return this.channelModel.findOneAndUpdate(channelFilterQuery, channel, {
      new: true,
    });
  }
}

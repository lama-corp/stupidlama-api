import { Injectable } from '@nestjs/common';
import { Channel } from './channels.schema';
import { ChannelsRepository } from './channels.repository';
import { ChannelDto } from './dto/channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private readonly channelsRepository: ChannelsRepository) {}

  async findOne(channelId: string): Promise<Channel> {
    return this.channelsRepository.findOne({ id: channelId });
  }

  async findAll(): Promise<Channel[]> {
    return this.channelsRepository.find({});
  }

  async create(channelDto: ChannelDto): Promise<Channel> {
    return this.channelsRepository.create(channelDto);
  }

  async updateHidden(channelId: string, hidden: boolean): Promise<Channel> {
    return await this.channelsRepository.findOneAndUpdate(
      {
        id: channelId,
      },
      { hidden },
    );
  }

  async update(channelId: string, channelDto: ChannelDto): Promise<Channel> {
    return await this.channelsRepository.findOneAndUpdate(
      {
        id: channelId,
      },
      channelDto,
    );
  }
}

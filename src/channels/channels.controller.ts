import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ImportChannelDto } from './dto/import-channel.dto';
import { ChannelsService } from './channels.service';
import { Channel } from './channels.schema';
import { YoutubeService } from '../shared/youtube/youtube.service';

@Controller('channels')
export class ChannelsController {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Get()
  async findAll(): Promise<Channel[]> {
    return this.channelsService.findAll();
  }

  @Get(':channelId')
  async findOne(@Param() params): Promise<Channel> {
    return this.channelsService.findOne(params.channelId);
  }

  @Post('import-from-platform')
  async createFrom(@Body() importChannelDto: ImportChannelDto) {
    return await this.channelsService.create(
      await this.youtubeService.getChannel(importChannelDto.platformId),
    );
  }

  @Put(':channelId/hide')
  @HttpCode(204)
  async hide(@Param() params) {
    await this.channelsService.updateHidden(params.channelId, true);
  }

  @Put(':channelId/show')
  @HttpCode(204)
  async show(@Param() params) {
    await this.channelsService.updateHidden(params.channelId, false);
  }

  @Put(':channelId/refresh-from-platform')
  async refreshFromPlatform(@Param() params): Promise<Channel> {
    const channel: Channel = await this.channelsService.findOne(
      params.channelId,
    );
    const channelDto = await this.youtubeService.getChannel(channel.platformId);

    return await this.channelsService.update(channel.id, channelDto);
  }
}

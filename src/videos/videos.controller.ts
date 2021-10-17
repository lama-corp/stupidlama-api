import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ImportVideoDto } from './dto/import-video.dto';
import { VideosService } from './videos.service';
import { Video } from './videos.schema';
import { YoutubeService } from '../shared/youtube/youtube.service';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Get(':videoId')
  async findOne(@Param() params): Promise<Video> {
    return this.videosService.findOne(params.videoId);
  }

  @Post('import-from-platform')
  async createFrom(@Body() importVideoDto: ImportVideoDto) {
    return await this.videosService.create(
      await this.youtubeService.getVideo(importVideoDto.platformId),
    );
  }

  @Put(':videoId/hide')
  @HttpCode(204)
  async hide(@Param() params) {
    await this.videosService.updateHidden(params.videoId, true);
  }

  @Put(':videoId/show')
  @HttpCode(204)
  async show(@Param() params) {
    await this.videosService.updateHidden(params.videoId, false);
  }

  @Put(':videoId/refresh-from-platform')
  async refreshFromPlatform(@Param() params): Promise<Video> {
    const video: Video = await this.videosService.findOne(params.videoId);
    const videoDto = await this.youtubeService.getVideo(video.platformId);

    return await this.videosService.update(video.id, videoDto);
  }
}

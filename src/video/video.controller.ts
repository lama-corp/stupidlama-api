import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVideoDto } from './create-video.dto';
import { VideosService } from './video.service';
import { Video } from './video.schema';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    await this.videosService.create(createVideoDto);
  }
}

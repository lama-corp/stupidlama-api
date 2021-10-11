import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './videos.schema';
import { VideosRepository } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videosRepository.create(createVideoDto);
  }

  async findAll(): Promise<Video[]> {
    return this.videosRepository.find({});
  }
}

import { Injectable } from '@nestjs/common';
import { Video } from './videos.schema';
import { VideosRepository } from './videos.repository';
import { VideoDto } from './dto/video.dto';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  async findOne(videoId: string): Promise<Video> {
    return this.videosRepository.findOne({ id: videoId });
  }

  async findAll(): Promise<Video[]> {
    return this.videosRepository.find({});
  }

  async create(videoDto: VideoDto): Promise<Video> {
    return this.videosRepository.create(videoDto);
  }

  async updateHidden(videoId: string, hidden: boolean): Promise<Video> {
    return await this.videosRepository.findOneAndUpdate(
      {
        id: videoId,
      },
      { hidden },
    );
  }

  async update(videoId: string, videoDto: VideoDto): Promise<Video> {
    return await this.videosRepository.findOneAndUpdate(
      {
        id: videoId,
      },
      videoDto,
    );
  }
}

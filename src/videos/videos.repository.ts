import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Video, VideoDocument } from './videos.schema';
import { VideoDto } from './dto/video.dto';

@Injectable()
export class VideosRepository {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async findOne(videoFilterQuery: FilterQuery<VideoDocument>): Promise<Video> {
    return this.videoModel.findOne(videoFilterQuery);
  }

  async find(videosFilterQuery: FilterQuery<VideoDocument>): Promise<Video[]> {
    return this.videoModel.find(videosFilterQuery);
  }

  async create(videoDto: VideoDto): Promise<Video> {
    const video = new this.videoModel(videoDto);
    return video.save();
  }

  async findOneAndUpdate(
    videoFilterQuery: FilterQuery<VideoDocument>,
    video: Partial<Video>,
  ): Promise<Video> {
    return this.videoModel.findOneAndUpdate(videoFilterQuery, video, {
      new: true,
    });
  }
}

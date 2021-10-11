import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Video, VideoDocument } from './videos.schema';
import { CreateVideoDto } from './dto/create-video.dto';

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

  async create(video: CreateVideoDto): Promise<Video> {
    const newVideo = new this.videoModel(video);
    return newVideo.save();
  }
}

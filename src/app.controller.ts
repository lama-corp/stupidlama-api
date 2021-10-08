import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { YoutubeVideo } from './app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('video/:id')
  async getYoutubeVideo(@Param() params): Promise<YoutubeVideo> {
    return await this.appService.getYoutubeVideo(params.id);
  }
}

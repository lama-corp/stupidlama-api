import { Test } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

describe('VideosController', () => {
  let controller: VideosController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [VideosService],
    })
      .overrideProvider(VideosService)
      .useValue({})
      .compile();

    controller = module.get<VideosController>(VideosController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
});

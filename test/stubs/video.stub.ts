import { ImportVideoDto } from '../../src/videos/dto/import-video.dto';
import { Video } from '../../src/videos/videos.schema';

export const importVideoDtoStub: ImportVideoDto = {
  // link: 'CmELf8DJAVY',
  platformName: 'youtube',
  platformId: 'zo2Q2MjqSVo',
};

export const videoStub: Video = {
  id: '4a375a64-c33a-4782-8990-3ad03a3ae8cd',
  platformId: 'zo2Q2MjqSVo',
  title: 'NUXTJS : INSTALLER LODASH proprement - webpack analyzer et wrappers',
  hidden: false,
  categoryId: 27,
  publishedAt: `${new Date()}`,
  description: '',
  viewCount: 0,
  likeCount: 0,
  dislikeCount: 0,
};

export const videoFalsyStub: Video = {
  id: '4a375a64-c33a-4782-8990-3ad03a3ae8cd',
  platformId: 'zo2Q2MjqSVo',
  title: 'test',
  hidden: false,
  categoryId: 27,
  publishedAt: `${new Date()}`,
  description: '',
  viewCount: 0,
  likeCount: 0,
  dislikeCount: 0,
};

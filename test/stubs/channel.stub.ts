import { Channel } from '../../src/channels/channels.schema';
import { ImportChannelDto } from '../../src/channels/dto/import-channel.dto';

export const importChannelDtoStub: ImportChannelDto = {
  // link: 'CmELf8DJAVY',
  platformName: 'youtube',
  platformId: 'UCJ-pCPUnfgbzA6fDRMz14gA',
};

export const channelStub: Channel = {
  id: '5a375a64-c33a-4782-8990-3ad03a3ae8cd',
  platformId: 'UCJ-pCPUnfgbzA6fDRMz14gA',
  name: 'Lama Codeur',
  description: '',
  hidden: false,
  joinedAt: `${new Date()}`,
  nbSubscribers: 100, // Soon...
};

export const channelFalsyStub: Channel = {
  id: '5a375a64-c33a-4782-8990-3ad03a3ae8cd',
  platformId: 'UCJ-pCPUnfgbzA6fDRMz14gA',
  name: 'Lama Raging',
  description: '',
  hidden: false,
  joinedAt: `${new Date()}`,
  nbSubscribers: 100, // Soon...
};

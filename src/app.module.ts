import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { VideosModule } from './videos/videos.module';
import { ChannelsModule } from './channels/channels.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.env.NODE_ENV}.env`],
      isGlobal: true,
    }),
    DatabaseModule,
    SharedModule,
    VideosModule,
    ChannelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from './Banner.entity';
import { BannerService } from './Banner.service';
import { BannerController } from './Banner.Controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
      TypeOrmModule.forFeature([
      BannerEntity,
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
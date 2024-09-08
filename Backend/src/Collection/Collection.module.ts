import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './Collection.entity';
import { CollectionService } from './Collection.service';
import { CollectionController } from './Collection.controller';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([
      CollectionEntity,
    ]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
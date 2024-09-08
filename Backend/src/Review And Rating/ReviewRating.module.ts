import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRatingEntity } from './ReviewRating.entity';
import { ReviewRatingController } from './ReviewRating.controller';
import { ReviewRatingService } from './ReviewRating.service';



@Module({
  imports: [
   
    TypeOrmModule.forFeature([
      ReviewRatingEntity,
    ]),
  ],
  controllers: [ReviewRatingController],
  providers: [ReviewRatingService],
})
export class ReviewRatingModule {}
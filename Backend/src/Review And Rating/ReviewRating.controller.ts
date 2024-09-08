import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ReviewRatingEntity } from './ReviewRating.entity';
import { ReviewRatingService } from './ReviewRating.service';

@Controller('ReviewRating')
export class ReviewRatingController {
  constructor(private readonly ReviewRatingService: ReviewRatingService) {}

  @Get()
  getHello(): string {
    return this.ReviewRatingService.getHello();
  }
  @Post('/addReviewRating')
  async addReviewRating(@Body() ReviewRatingData:ReviewRatingEntity):Promise<boolean|any>
  {
    return await this.ReviewRatingService.addReviewRating(ReviewRatingData);
  }
  @Get('/search/:userId/:productId')
  async SearchByUserID(@Param('userId', ParseIntPipe) userId:number,@Param('productId', ParseIntPipe) productId:number):Promise<any>
  {
    return await this.ReviewRatingService.findByUserId(userId,productId);
  }
  @Get('/search/:productId')
  async SearchByProductID(@Param('productId', ParseIntPipe) productId:number):Promise<any>
  {
    return await this.ReviewRatingService.SearchByProductID(productId);
  }
  @Put('/update/:userId/:productId')
  async update(@Param('userId', ParseIntPipe) userId:number,@Param('productId', ParseIntPipe) productId:number,@Body()updateData:ReviewRatingEntity):Promise<any>
  {
    return await this.ReviewRatingService.update(userId,productId,updateData);
  }
  @Get('/averageRating/:productId')
  async averageRating(@Param('productId', ParseIntPipe) productId:number):Promise<any>
  {
    return await this.ReviewRatingService.averageRating(productId);
  }
  @Delete('/remove/:userId/:productId')
  async DeleteByUserID(@Param('userId', ParseIntPipe) userId:number,@Param('productId', ParseIntPipe) productId:number):Promise<any>
  {
    return await this.ReviewRatingService.DeleteByUserID(userId,productId);
  }
}

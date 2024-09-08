import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewRatingEntity } from './ReviewRating.entity';

@Injectable()
export class ReviewRatingService {
  constructor(
    @InjectRepository(ReviewRatingEntity)
    private ReviewRatingRepo: Repository<ReviewRatingEntity>,

  ) { }
  getHello(): string {
    return 'Hello ReviewRating!';
  }
  async findById(id: number): Promise<ReviewRatingEntity | null> {
    let ReviewRatingEntity = await this.ReviewRatingRepo.findOne({ where: { Id: id } });
    if (ReviewRatingEntity != null) {
      return ReviewRatingEntity;
    }
    return null;
  }
  
  async SearchByProductID(ProductId: number): Promise<ReviewRatingEntity[] | null> {
    let ReviewRatingEntity = await this.ReviewRatingRepo.find({
        where: {
          product: { Id: ProductId }
        },
        relations: ['user']
      });
    console.log("ReviewRatingEntity: "+ReviewRatingEntity);
    if (ReviewRatingEntity != null) {
      return ReviewRatingEntity;
    }
    return null;
  }

  async findByUserId(UserId: number, ProductId: number): Promise<ReviewRatingEntity | null> {
    let ReviewRatingEntity = await this.ReviewRatingRepo.findOne({
        where: {
          user: { Id: UserId },
          product: { Id: ProductId }
        }
      });
    if (ReviewRatingEntity != null) {
      return ReviewRatingEntity;
    }
    return null;
  }
  
  async DeleteByUserID(UserId: number, ProductId: number): Promise<boolean|null> {
    let ReviewRatingEntity = await this.findByUserId(UserId,ProductId);
    if (ReviewRatingEntity != null) {
        const deleteInfo = await this.ReviewRatingRepo.remove(ReviewRatingEntity);
        if(deleteInfo)
        {
            return true;
        }
        return false;

    }
    return null;
  }
  async averageRating(ProductId: number): Promise<any> {
    let ReviewRatingEntity = await this.ReviewRatingRepo.find({
        where: {
          product: { Id: ProductId }
        }
      });
    if (ReviewRatingEntity != null) {
        let count =0;
        let total =0;
        ReviewRatingEntity.forEach(element => {
            total = element.rating+total;
            count++;
        });
        const average = total/count;
        const averageRounded = average.toFixed(1);

        return parseFloat(averageRounded); 
    }
    return null;
  }

  async update(UserId: number, ProductId: number,updateData:ReviewRatingEntity): Promise<ReviewRatingEntity | null> {
    const ReviewRatingEntity = await this.findByUserId(UserId,ProductId);

    if (ReviewRatingEntity != null) {
      const UpdateReviewRatingEntity = await this.ReviewRatingRepo.update(
        { user: { Id: UserId }, product: { Id: ProductId } },
        updateData,
      );
      console.log("UpdateReviewRatingEntity: "+UpdateReviewRatingEntity)
      return updateData;
    }
    return null;
  }

  async addReviewRating(ReviewRatingEntity: ReviewRatingEntity): Promise<boolean> {
        const currentDateTime = new Date();
        ReviewRatingEntity.date=currentDateTime;
    
        let ReviewRating = await this.ReviewRatingRepo.save(ReviewRatingEntity);
        if (ReviewRating != null) {
          return true;
        }
        return false;

  }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishListEntity } from './WishList.entity';
import { ProductEntity } from 'src/Product/Product.entity';
import { UserEntity } from 'src/User/User.entity';

@Injectable()
export class WishListService {
  constructor( @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>, @InjectRepository(WishListEntity) private wishlistRepo: Repository<WishListEntity>, @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,){}
  async wishListProduct(myobj: WishListEntity): Promise<WishListEntity | { message: string } | boolean> {
    console.log(myobj);
    const currentDateTime = new Date();
    myobj.date = currentDateTime;
  
    try {
      const existingWishlistItem = await this.wishlistRepo.findOne({
        where: {
          user: { Id: myobj.user.Id },
          product: { Id: myobj.product.Id },
        },
      });
  
      if (existingWishlistItem) {
        return { message: 'This product is already in the wishlist.' };
      }
  
      const savedEntity = await this.wishlistRepo.save(myobj);
      if (savedEntity) {
        return savedEntity;
      } else {
        return { message: 'Failed to save the wishlist product.' };
      }
    } catch (error) {
      console.error('Error saving wishlist product:', error);
      return false;
    }
  }
  


  async showWishListProduct(username:number): Promise<WishListEntity[]> {
    return await this.wishlistRepo.find({where:{user:{Id:username}}, relations: ['product']});
  }
  
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishListEntity } from './WishList.entity';
import { WishListController } from './WishList.controller';
import { WishListService } from './WishList.service';
import { ProductEntity } from 'src/Product/Product.entity';
import { UserEntity } from 'src/User/User.entity';



@Module({
  imports: [
   
    TypeOrmModule.forFeature([
        WishListEntity, ProductEntity, UserEntity,
    ]),
  ],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule {}
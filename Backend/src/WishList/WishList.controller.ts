import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { WishListService } from './WishList.service';
import { WishListEntity } from './WishList.entity';




@Controller('WishList')
export class WishListController {
  constructor(private readonly wishlistService: WishListService) {}

  @Post('/add')
  wishListProduct(@Body() myobj: WishListEntity): Promise<WishListEntity | { message: string}|boolean > {
    console.log(myobj);
    return this.wishlistService.wishListProduct(myobj);
  }

  @Get('show_wishlist/:userId')
  showWishListProduct(@Param('userId',ParseIntPipe) userId:number): Promise<WishListEntity[]> {
    return this.wishlistService.showWishListProduct(userId);
  }

}
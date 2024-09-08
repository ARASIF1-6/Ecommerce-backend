import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartEntity } from './Cart.entity';
import { CartService } from './Cart.service';


@Controller('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getHello(): string {
    return this.cartService.getHello();
  }
  @Post('/addToCart')
  async addToCart(@Body() CartData:CartEntity):Promise<boolean>
  {
    return await this.cartService.addToCart(CartData);
  }
}
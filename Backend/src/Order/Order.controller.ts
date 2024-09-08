import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderEntity } from './Order.entity';
import { OrderService } from './Order.service';



@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }
  @Post('/addOrder')
  async addOrder(@Body() OrderData:OrderEntity):Promise<boolean>
  {
    return await this.orderService.addOrder(OrderData);
  }
}

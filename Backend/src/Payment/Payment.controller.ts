import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './Payment.service';

@Controller('Payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    getHello(): string {
        return "";
    }
    //   @Post('/addCategory')
    //   async addOrder(@Body() CategoryData:CategoryEntity):Promise<boolean>
    //   {
    //     return await this.categoryService.addCategory(CategoryData);
    //   }
}

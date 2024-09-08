import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiscountService } from './Discount.service';

@Controller('Discount')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

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

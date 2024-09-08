import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderHistoryMapperService } from './OHM.service';

@Controller('OrderHistoryMapper')
export class OrderHistoryMapperController {
    constructor(private readonly orderHistoryMapperService: OrderHistoryMapperService) { }

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

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductOrderMapperService } from './ProductOrdeMapper.service';

@Controller('ProductOrderMapper')
export class ProductOrderMapperController {
    constructor(private readonly productOrderMapperService: ProductOrderMapperService) { }

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

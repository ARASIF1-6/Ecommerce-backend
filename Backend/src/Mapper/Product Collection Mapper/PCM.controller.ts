import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductCollectionMapperService } from './PCM.service';
import { ProductCollectionMapperEntity } from './PCM.entity';
import { ProductEntity } from 'src/Product/Product.entity';
import { ProductService } from 'src/Product/Product.service';

@Controller('ProductCollectionMapper')
export class ProductCollectionMapperController {
    constructor(private readonly ProductCollectionMapperService: ProductCollectionMapperService,

    ) { }

    @Get()
    getHello(): string {
        return "";
    }
      @Post('/addProductInCollection')
      async addProductCollectionMapper(@Body() ProductCollectionMapper:ProductCollectionMapperEntity):Promise<boolean>
      {
        return await this.ProductCollectionMapperService.add(ProductCollectionMapper);
      }
      @Get('/search/:CollectionId')
      async SearchByCollectionID(@Param('CollectionId', ParseIntPipe) CollectionId: number): Promise<null | ProductEntity[]> {
        return await this.ProductCollectionMapperService.SearchByCollectionID(CollectionId);
      }
}

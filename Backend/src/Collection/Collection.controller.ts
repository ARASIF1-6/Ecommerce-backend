import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CollectionEntity } from './Collection.entity';
import { CollectionService } from './Collection.service';

@Controller('Collection')
export class CollectionController {
  constructor(private readonly CollectionService: CollectionService) { }

  @Get()
  getHello(): string {
    return this.CollectionService.getHello();
  }
  @Get('/search/:id')
  async SearchByID(@Param('id', ParseIntPipe) Id: number): Promise<any> {
    return await this.CollectionService.findById(Id);
  }
  @Get('/search')
  async Search(): Promise<any> {
    return await this.CollectionService.findAll();
  }

  @Post('/addCollection')
  async addCollection(@Body() CollectionData: CollectionEntity): Promise<boolean> {
    return await this.CollectionService.addCollection(CollectionData);//Collection/addCollection
  }
}

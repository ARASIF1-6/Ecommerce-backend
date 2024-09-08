import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoryEntity } from './Category.entity';
import { CategoryService } from './Category.service';

@Controller('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  getHello(): string {
    return this.categoryService.getHello();
  }
  @Get('/search/:id')
  async SearchByID(@Param('id', ParseIntPipe) Id: number): Promise<any> {
    return await this.categoryService.findById(Id);
  }
  @Get('/search')
  async Search(): Promise<any> {
    return await this.categoryService.findAll();
  }

  @Post('/addCategory')
  async addCategory(@Body() CategoryData: CategoryEntity): Promise<boolean> {
    return await this.categoryService.addCategory(CategoryData);//Category/addCategory
  }
}

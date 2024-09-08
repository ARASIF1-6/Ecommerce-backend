import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './Category.entity';
import { CategoryService } from './Category.service';
import { CategoryController } from './Category.controller';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([
      CategoryEntity,
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) { }
  getHello(): string {
    return 'Hello Order!';
  }
  async findById(id: number): Promise<CategoryEntity | null> {
    let categoryEntity = await this.categoryRepo.findOne({ where: { Id: id } });
    if (categoryEntity != null) {
      return categoryEntity;
    }
    return null;
  }
  async findAll(): Promise<any[]> {
    let categoryEntities = await this.categoryRepo.find();
    if (categoryEntities.length > 0) {
      return categoryEntities;
    }
    return [];
  }


  async addCategory(categoryEntity: CategoryEntity): Promise<boolean> {
    let Category = await this.categoryRepo.save(categoryEntity);
    if (Category != null) {
      return true;
    }
    return false;
  }

}
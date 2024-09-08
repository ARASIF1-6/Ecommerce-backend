import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity } from './Collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private CollectionRepo: Repository<CollectionEntity>,
  ) { }
  getHello(): string {
    return 'Hello Order!';
  }
  async findById(id: number): Promise<CollectionEntity | null> {
    let CollectionEntity = await this.CollectionRepo.findOne({ where: { Id: id } });
    if (CollectionEntity != null) {
      return CollectionEntity;
    }
    return null;
  }
  async findAll(): Promise<any[]> {
    let CollectionEntities = await this.CollectionRepo.find();
    if (CollectionEntities.length > 0) {
      return CollectionEntities;
    }
    return [];
  }


  async addCollection(CollectionEntity: CollectionEntity): Promise<boolean> {
    let Collection = await this.CollectionRepo.save(CollectionEntity);
    if (Collection != null) {
      return true;
    }
    return false;
  }

}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrderMapperEntity } from './ProductOrderMapper.entity';

@Injectable()
export class ProductOrderMapperService {
    constructor(
        @InjectRepository(ProductOrderMapperEntity)
        private productOrderMapperRepo: Repository<ProductOrderMapperEntity>,
    ) { }
    getHello(): string {
        return 'Hello Order!';
    }
    async findById(id: number): Promise<ProductOrderMapperEntity | null> {
        let productOrderMapperEntity = await this.productOrderMapperRepo.findOne({ where: { Id: id } });
        if (productOrderMapperEntity != null) {
            return productOrderMapperEntity;
        }
        return null;
    }

    async add(productOrderMapperEntity: ProductOrderMapperEntity): Promise<boolean> {
        let ProductOrderMapper = await this.productOrderMapperRepo.save(productOrderMapperEntity);
        if (ProductOrderMapper != null) {
            return true;
        }
        return false;
    }

}
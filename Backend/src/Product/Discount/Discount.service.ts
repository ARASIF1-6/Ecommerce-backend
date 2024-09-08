import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountEntity } from './Discount.entity';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(DiscountEntity)
        private discountRepo: Repository<DiscountEntity>,
    ) { }
    getHello(): string {
        return 'Hello Order!';
    }
    async findById(id: number): Promise<DiscountEntity | null> {
        let DiscountEntity = await this.discountRepo.findOne({ where: { Id: id } });
        if (DiscountEntity != null) {
            return DiscountEntity;
        }
        return null;
    }

    async add(DiscountEntity: DiscountEntity): Promise<boolean> {
        let discount = await this.discountRepo.save(DiscountEntity);
        if (discount != null) {
            return true;
        }
        return false;
    }

}
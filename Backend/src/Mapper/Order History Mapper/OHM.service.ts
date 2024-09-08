import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderHistoryMapperEntity } from './OHM.entity';

@Injectable()
export class OrderHistoryMapperService {
    constructor(
        @InjectRepository(OrderHistoryMapperEntity)
        private orderHistoryMapperRepo: Repository<OrderHistoryMapperEntity>,
    ) { }
    getHello(): string {
        return 'Hello Order!';
    }
    async findById(id: number): Promise<OrderHistoryMapperEntity | null> {
        let OrderHistoryMapperEntity = await this.orderHistoryMapperRepo.findOne({ where: { Id: id } });
        if (OrderHistoryMapperEntity != null) {
            return OrderHistoryMapperEntity;
        }
        return null;
    }

    async add(OrderHistoryMapperEntity: OrderHistoryMapperEntity): Promise<boolean> {
        let OrderHistoryMapper = await this.orderHistoryMapperRepo.save(OrderHistoryMapperEntity);
        if (OrderHistoryMapper != null) {
            return true;
        }
        return false;
    }

}
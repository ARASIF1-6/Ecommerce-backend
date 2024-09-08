import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './Payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepo: Repository<PaymentEntity>,
    ) { }
    getHello(): string {
        return 'Hello Order!';
    }
    async findById(id: number): Promise<PaymentEntity | null> {
        let PaymentEntity = await this.paymentRepo.findOne({ where: { Id: id } });
        if (PaymentEntity != null) {
            return PaymentEntity;
        }
        return null;
    }

    async add(PaymentEntity: PaymentEntity): Promise<boolean> {
        let Payment = await this.paymentRepo.save(PaymentEntity);
        if (Payment != null) {
            return true;
        }
        return false;
    }

}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from './Discount.entity';
import { DiscountService } from './Discount.service';
import { DiscountController } from './Dscount.Controller';


@Module({
    imports: [

        TypeOrmModule.forFeature([
            DiscountEntity,
        ]),
    ],
    controllers: [DiscountController],
    providers: [DiscountService],
})
export class DiscountModule { }
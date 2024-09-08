import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrderMapperController } from './ProductOrderMapper.controller';
import { ProductOrderMapperService } from './ProductOrdeMapper.service';
import { ProductOrderMapperEntity } from './ProductOrderMapper.entity';

@Module({
    imports: [

        TypeOrmModule.forFeature([
            ProductOrderMapperEntity,
        ]),
    ],
    controllers: [ProductOrderMapperController],
    providers: [ProductOrderMapperService],
})
export class ProductOrderMapperModule { }
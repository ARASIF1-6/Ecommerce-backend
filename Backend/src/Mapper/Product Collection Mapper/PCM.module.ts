import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCollectionMapperEntity } from './PCM.entity';
import { ProductCollectionMapperService } from './PCM.service';
import { ProductCollectionMapperController } from './PCM.controller';
import { ProductEntity } from 'src/Product/Product.entity';


@Module({
    imports: [

        TypeOrmModule.forFeature([
            ProductCollectionMapperEntity,ProductEntity
        ]),
    ],
    controllers: [ProductCollectionMapperController],
    providers: [ProductCollectionMapperService],
})
export class ProductCollectionMapperModule { }
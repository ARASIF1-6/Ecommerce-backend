import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoryMapperEntity } from './OHM.entity';
import { OrderHistoryMapperService } from './OHM.service';
import { OrderHistoryMapperController } from './OHM.controller';


@Module({
    imports: [

        TypeOrmModule.forFeature([
            OrderHistoryMapperEntity,
        ]),
    ],
    controllers: [OrderHistoryMapperController],
    providers: [OrderHistoryMapperService],
})
export class OrderHistoryMapperModule { }
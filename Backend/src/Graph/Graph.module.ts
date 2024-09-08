import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { OrderEntity } from 'src/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [GraphService],
  controllers: [GraphController],
})
export class GraphModule {}

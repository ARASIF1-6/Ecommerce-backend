import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './Order.entity';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';
import { ProductModule } from 'src/Product/Product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ProductModule, 
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

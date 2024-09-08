import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './Cart.entity';
import { CartController } from './Cart.controller';
import { CartService } from './Cart.service';


@Module({
  imports: [
   
    TypeOrmModule.forFeature([
      CartEntity,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
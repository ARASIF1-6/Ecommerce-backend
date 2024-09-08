import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './Cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
  ) { }
  getHello(): string {
    return 'Hello Cart!';
  }
  async findById(id: number): Promise<CartEntity | null> {
    let cartEntity = await this.cartRepo.findOne({ where: { Id: id } });
    if (cartEntity != null) {
      return cartEntity;
    }
    return null;
  }

  async addToCart(cartEntity: CartEntity): Promise<boolean> {
    let cart = await this.cartRepo.save(cartEntity);
    if (cart != null) {
      return true;
    }
    return false;
  }
}

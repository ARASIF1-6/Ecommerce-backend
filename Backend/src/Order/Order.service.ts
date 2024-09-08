import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { ProductEntity } from 'src/Product/Product.entity';
import { ProductService } from 'src/Product/Product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private readonly productService: ProductService, 

  ) { }
  getHello(): string {
    return 'Hello Order!';
  }
  async findById(id: number): Promise<OrderEntity | null> {
    let orderEntity = await this.orderRepo.findOne({ where: { Id: id } });
    if (orderEntity != null) {
      return orderEntity;
    }
    return null;
  }

  async addOrder(orderEntity: OrderEntity): Promise<boolean> {
    try{    
      const productId=orderEntity.product.Id;
      const productResponse= await this.productService.SearchByID(productId);
      if(productResponse)
      {
        orderEntity.date=new Date();
        let Order = await this.orderRepo.save(orderEntity);
        if (Order != null) {
    
          return true;
        }
        return false;
      }
    }
    catch(error){
      throw error;

    }



  }

  //   async login(loginData:OrderEntity):Promise<boolean>
  //   {
  //     let findAdmin= await this.findByUsername(loginData.username);
  //     if(findAdmin!=null && findAdmin.password==loginData.password)
  //     {
  //       return true;
  //     }

  //     return false;

  //   }
}

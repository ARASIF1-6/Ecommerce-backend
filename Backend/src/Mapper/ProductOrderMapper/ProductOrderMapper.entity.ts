import { CartEntity } from "src/Cart/Cart.entity";
import { OrderEntity } from "src/Order/Order.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity("ProductOrderMapper")
export class ProductOrderMapperEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(() => ProductEntity, product => product.productOrderMapper)
    product: ProductEntity;
    @ManyToOne(() => CartEntity, cart => cart.productOrderMapper)
    cart: CartEntity;
    @ManyToOne(() => OrderEntity, order => order.productOrderMapper)
    order: OrderEntity;

}

import { ProductOrderMapperEntity } from "src/Mapper/ProductOrderMapper/ProductOrderMapper.entity";
import { OrderEntity } from "src/Order/Order.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { UserEntity } from "src/User/User.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("Cart")
export class CartEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ name: 'session_id', type: "int" })
  session_id: number;
  @Column({ name: 'date', type: "timestamp" })
  date: Date;
  @ManyToOne(() => UserEntity, user => user.cart)
  user: UserEntity;
  @ManyToOne(() => ProductEntity, product => product.cart)
  product: UserEntity;
  @OneToMany(() => ProductOrderMapperEntity, productOrderMapper => productOrderMapper.product)
  productOrderMapper: ProductOrderMapperEntity[];
}
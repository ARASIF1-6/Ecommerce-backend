import { CartEntity } from "src/Cart/Cart.entity";
import { OrderHistoryMapperEntity } from "src/Mapper/Order History Mapper/OHM.entity";
import { ProductOrderMapperEntity } from "src/Mapper/ProductOrderMapper/ProductOrderMapper.entity";
import { PaymentEntity } from "src/Payment/Payment.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { UserEntity } from "src/User/User.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("Order")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ name: 'date', type: "timestamp" })
  date: Date;
  @Column({ name: 'amount', type: "int" })
  amount: number;
  @Column({ name: 'status', type: "varchar" })
  status: string;
  // @ManyToOne(() => PurchaseEntity, purchase => purchase.order)
  // purchase: PurchaseEntity;
  @ManyToOne(() => ProductEntity, product => product.order)
  product: ProductEntity;
  @ManyToOne(() => UserEntity, user => user.order)
  user: UserEntity;
  @OneToMany(() => ProductOrderMapperEntity, productOrderMapper => productOrderMapper.order)
  productOrderMapper: ProductOrderMapperEntity[];
  @OneToMany(() => PaymentEntity, payment => payment.order)
  payment: PaymentEntity[];
  @OneToMany(() => OrderHistoryMapperEntity, orderHistoryMapper => orderHistoryMapper.order)
  orderHistoryMapper: OrderHistoryMapperEntity[];
}
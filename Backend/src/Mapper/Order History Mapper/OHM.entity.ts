import { CartEntity } from "src/Cart/Cart.entity";
import { OrderEntity } from "src/Order/Order.entity";
import { PaymentEntity } from "src/Payment/Payment.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity("OrderHistoryMapper")
export class OrderHistoryMapperEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(() => PaymentEntity, payment => payment.orderHistoryMapper)
    payment: PaymentEntity;
    @ManyToOne(() => OrderEntity, order => order.orderHistoryMapper)
    order: OrderEntity;

}

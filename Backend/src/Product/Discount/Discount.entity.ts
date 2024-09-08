import { ProductEntity } from "src/Product/Product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity("Discount")
export class DiscountEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ name: 'Discount_Percent', type: "int" })
    Discount_Percent: number;
    @Column({ name: 'Expire_Date', type: "timestamp" })
    Expire_Date: Date;

    @ManyToOne(() => ProductEntity, product => product.discount)
    product: ProductEntity[];


}

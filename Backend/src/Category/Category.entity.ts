import { CartEntity } from "src/Cart/Cart.entity";
import { OrderEntity } from "src/Order/Order.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("Category")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'name', type: "varchar", length: 150 })
  name: string;

  @OneToMany(() => ProductEntity, product => product.category)
  product: ProductEntity[];

}

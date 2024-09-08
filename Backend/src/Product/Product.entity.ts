import { CartEntity } from "src/Cart/Cart.entity";
import { CategoryEntity } from "src/Category/Category.entity";
import { OrderEntity } from "src/Order/Order.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { DiscountEntity } from "./Discount/Discount.entity";
import { ProductOrderMapperEntity } from "src/Mapper/ProductOrderMapper/ProductOrderMapper.entity";
import { ProductCollectionMapperEntity } from "src/Mapper/Product Collection Mapper/PCM.entity";
import { ReviewRatingEntity } from "src/Review And Rating/ReviewRating.entity";
import { WishListEntity } from "src/WishList/WishList.entity";

@Entity("Product")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'name', type: "varchar", length: 150 })
  name: string;

  @Column({ name: 'desc', type: "varchar", length: 150 })
  desc: string;

  @Column({ name: 'price', type: "int" })
  price: number;

  @Column({ name: 'quantity', type: "varchar", length: 150 }) // Assuming phone should be stored as a string due to potential leading zeros and formatting
  quantity: string;

  @Column({ name: 'image', type: "varchar", length: 1500 })
  image: string;

  @Column({ name: 'date', type: "timestamp" })
  date: Date;
  @Column({ name: 'json_atribute', type: "varchar", length: 150 })
  json_atribute: string;
  @OneToMany(() => CartEntity, cart => cart.product)
  cart: CartEntity[];
  @OneToMany(() => DiscountEntity, discount => discount.product)
  discount: DiscountEntity[];
  @OneToMany(() => OrderEntity, order => order.product)
  order: OrderEntity[];
  @ManyToOne(() => CategoryEntity, category => category.product)
  category: CategoryEntity;
  @OneToMany(() => ProductOrderMapperEntity, productOrderMapper => productOrderMapper.product)
  productOrderMapper: ProductOrderMapperEntity[];
  @OneToMany(() => ProductCollectionMapperEntity, productCollectionMapper => productCollectionMapper.product)
  productCollectionMapper: ProductCollectionMapperEntity[];
  @OneToMany(() => ReviewRatingEntity, ReviewRating => ReviewRating.product)
  ReviewRating: ReviewRatingEntity[];
  @OneToMany(() => WishListEntity, wishlist => wishlist.product)
  wishlist: WishListEntity[];
}

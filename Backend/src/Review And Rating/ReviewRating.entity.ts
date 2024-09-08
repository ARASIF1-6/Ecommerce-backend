import { CartEntity } from "src/Cart/Cart.entity";
import { PaymentEntity } from "src/Payment/Payment.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { UserEntity } from "src/User/User.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity("ReviewRating")
export class ReviewRatingEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'date', type: "timestamp" })
  date: Date;

  @Column({ name: 'review', type: "varchar" })
  review: string;

  @Column({ name: 'rating', type: "float" })
  rating: number;

  @ManyToOne(() => ProductEntity, product => product.ReviewRating)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, user => user.ReviewRating)
  user: UserEntity;
}

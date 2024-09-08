import { CartEntity } from "src/Cart/Cart.entity";
import { CollectionEntity } from "src/Collection/Collection.entity";
import { OrderEntity } from "src/Order/Order.entity";
import { PaymentEntity } from "src/Payment/Payment.entity";
import { ProductEntity } from "src/Product/Product.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity("ProductCollectionMapper")
export class ProductCollectionMapperEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(() => ProductEntity, product => product.productCollectionMapper)
    product: ProductEntity;

    @ManyToOne(() => CollectionEntity, collection => collection.productCollectionMapper)
    collection: CollectionEntity;

}

import { ProductCollectionMapperEntity } from "src/Mapper/Product Collection Mapper/PCM.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("Collection")
export class CollectionEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'name', type: "varchar", length: 150 })
  name: string;
  @OneToMany(() => ProductCollectionMapperEntity, productCollectionMapper => productCollectionMapper.product)
  productCollectionMapper: ProductCollectionMapperEntity[];

}

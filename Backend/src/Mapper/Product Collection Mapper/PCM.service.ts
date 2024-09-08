import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCollectionMapperEntity } from './PCM.entity';
import { ProductEntity } from 'src/Product/Product.entity';

@Injectable()
export class ProductCollectionMapperService {
    constructor(
        @InjectRepository(ProductCollectionMapperEntity)
        private ProductCollectionMapperRepo: Repository<ProductCollectionMapperEntity>,
        @InjectRepository(ProductEntity)
        private ProductRepo: Repository<ProductEntity>,
        
    ) { }
    getHello(): string {
        return 'Hello Order!';
    }
    async findById(id: number): Promise<ProductCollectionMapperEntity | null> {
        let ProductCollectionMapperEntity = await this.ProductCollectionMapperRepo.findOne({ where: { Id: id } });
        if (ProductCollectionMapperEntity != null) {
            return ProductCollectionMapperEntity;
        }
        return null;
    }

    async add(ProductCollectionMapperEntity: ProductCollectionMapperEntity): Promise<boolean> {
        let ProductCollectionMapper = await this.ProductCollectionMapperRepo.save(ProductCollectionMapperEntity);
        if (ProductCollectionMapper != null) {
            return true;
        }
        return false;
    }
    async SearchByCollectionID(CollectionId: number): Promise<ProductEntity[] | null> {
        console.log(CollectionId);
        let productEntities = await this.ProductRepo.find({
            where: {
                // Assuming productCollectionMapper is a ManyToOne relation with CollectionEntity
                // Adjust the property name and type as per your actual entity structure
                productCollectionMapper: {
                    // Assuming 'collection' is a property in CollectionEntity
                    collection: {
                        Id: CollectionId // Assuming CollectionEntity has an 'id' property
                    }
                }
            }
        });
        console.log(productEntities);
    
        if (productEntities.length > 0) {
            return productEntities;
        }
        return null;
    }
    
    

}
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { DiscountEntity } from './Discount/Discount.entity';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) { }
  getHello(): string {
    return 'Hello Product!';
  }
  async SearchByID(Id: number): Promise<ProductEntity | null> {
    let productEntity = await this.productRepo.findOne({ where: { Id } });
    if (productEntity != null) {
      return productEntity;
    }
    return null;
  }
  async Search(): Promise<ProductEntity[] | null> {
    let productEntity = await this.productRepo.find();
    // console.log("productEntity:"+JSON.stringify(productEntity));
    if (productEntity.length>= 0) {
      return productEntity;
    }
    return null;
  }
  
  
  async SearchByCategoryID(categoryId: number): Promise<ProductEntity[] | null> {
    let productEntities = await this.productRepo.find({ where: { category: { Id: categoryId } } });
    if (productEntities.length > 0) {
      return productEntities;
    }
    return null;
  }


  async addProduct(productData: Partial<ProductEntity> ): Promise<ProductEntity | boolean> {
    try {  
      const ProductDetails = await this.productRepo.save(productData);
      
      if (ProductDetails != null) {
        return ProductDetails;
      }
    
    } catch (error) {
      console.error("Error saving product details:", error.message);
      throw new InternalServerErrorException('Error saving product details');
    }
    

  
  }

  async editProduct(id: number, productData: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({ where: { Id: id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  // Check if the image is being updated
  if (productData.image && product.image !== productData.image) {
    // Remove the old image from the folder
    await this.deleteImageFiles(product.image);
  }
    try {
      await this.productRepo.update(id, productData);
      return await this.productRepo.findOne({ where: { Id: id } });
    } catch (error) {
      console.error("Error editing product details:", error.message);
      throw new InternalServerErrorException('Error editing product details');
    }
  }
  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.productRepo.findOne({ where: { Id: id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    if (product.image) {
      await this.deleteImageFiles(product.image);
    }
  
    try {
      await this.productRepo.remove(product);
      return true;
    } catch (error) {
      console.error("Error removing product:", error.message);
      throw new InternalServerErrorException('Error removing product');
    }
  }
  
  private deleteImageFiles(imagePaths: string): void {
    const imageArray = imagePaths.split(',').map(image => image.trim());
    imageArray.forEach(imagePath => {
      const resolvedPath = path.resolve(imagePath);
      fs.unlink(resolvedPath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${resolvedPath}`, err);
        } else {
          console.log(`Successfully deleted image: ${resolvedPath}`);
        }
      });
    });
  }
}

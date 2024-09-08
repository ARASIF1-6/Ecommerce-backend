import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './Product.service';
import { ProductEntity } from './Product.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'; // Ensure correct import
import { diskStorage } from 'multer';
import { CategoryEntity } from 'src/Category/Category.entity';
import { extname, normalize, resolve } from 'path';


@Controller('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  getHello(): string {
    return this.productService.getHello();
  }
  @Get('/search/:id')
  async SearchByID(@Param('id', ParseIntPipe) Id: number): Promise<any> {
  //  const baseImageUrl = process.env.Product_Image_Destination;
  
    const product = await this.productService.SearchByID(Id);
    if (product) {
      const productWithImages = {
        ...product,
        image: product.image.split(',').map((filename) => {
          const trimmedPath = filename.trim();
          return normalize(trimmedPath).replace(/\\/g, '/');
        }),
      };
  
      return productWithImages;
    }
  
    return null;
  }
  
  @Get('/search')
  async Search(): Promise<null | any[]> {

    const productEntities =await this.productService.Search();
    if (productEntities) {
      const baseImageUrl = process.env.Product_Image_Destination;
  
      const productsWithImages = productEntities.map(product => {
        return {
          ...product,
          image: product.image.split(',').map((filename) => {
            const trimmedPath = filename.trim();
            return normalize(trimmedPath).replace(/\\/g, '/');
          }),
        };
      });
  
      return productsWithImages;
    }
  
    return null;
  }
  
  @Get('/searchByCategory/:CategoryId')
  
  async SearchByCategoryID(@Param('CategoryId', ParseIntPipe) Id: number): Promise<null | any[]> {
    const productEntities = await this.productService.SearchByCategoryID(Id);
  
    if (productEntities) {
     // const baseImageUrl = process.env.Product_Image_Destination;
  
      const productsWithImages = productEntities.map(product => {
        return {
          ...product,
          image: product.image.split(',').map((filename) => {
            const trimmedPath = filename.trim();
            return normalize(trimmedPath).replace(/\\/g, '/');
          }),
        };
      });
  
      return productsWithImages;
    }
  
    return null;
  }
  
  @Post('/add')
  @UseInterceptors(
    FilesInterceptor('ProductPicture', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dest = process.env.Product_Image_Destination;
          const resolvedDest = resolve(dest); // Ensure the path is absolute
          cb(null, resolvedDest);
        },             
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = extname(file.originalname); 
          const filename = `${uniqueSuffix}${extension}`; 
          cb(null, filename);
        },
      }),
    }),
  )
  async addProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ): Promise<boolean | ProductEntity> {
    const { name, desc, price, quantity, date, json_atribute, categoryId } = req.body;
      const productData: Partial<ProductEntity> = {
      name,
      desc,
      price: Number(price),
      quantity,
      date: new Date(date),
      json_atribute,
      category: { Id: categoryId } as CategoryEntity, 
      image: files.map(file => file.path).join(','),
    };
    return await this.productService.addProduct(productData);
  }
  

  @Put('/edit/:id')
  @UseInterceptors(
    FilesInterceptor('ProductPicture', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dest = process.env.Product_Image_Destination;
          cb(null, resolve(dest));
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async editProduct(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ): Promise<ProductEntity> {
    const productData: Partial<ProductEntity> = {
      name: req.body.name,
      desc: req.body.desc,
      price: Number(req.body.price),
      quantity: req.body.quantity,
      date: new Date(),
      json_atribute: req.body.json_atribute,
      category: { Id: req.body.categoryId } as CategoryEntity,
      image: files.length > 0 ? files.map(file => file.path).join(',') : undefined,
    };
    return await this.productService.editProduct(id, productData);
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.productService.deleteProduct(id);
  }
}

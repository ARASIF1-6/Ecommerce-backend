import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { BannerEntity } from './Banner.entity';
import { BannerService } from './Banner.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname, resolve } from 'path';

@Controller('Banner')
export class BannerController {
  constructor(private readonly BannerService: BannerService) {}

  @Get()
  getHello(): string {
    return this.BannerService.getHello();
  }


      // @Post('upload')
    // @UseInterceptors(
    //   FileInterceptor('file', {
    //     storage: diskStorage({
    //       destination: './uploads', // specify the directory where files will be saved
    //       filename: (req, file, cb) => {
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //         const filename = `${uniqueSuffix}-${file.originalname}`;
    //         cb(null, filename);
    //       },
    //     }),
    //   }),
    // )
    // async uploadFile(@UploadedFile() file: Express.Multer.File) {
    //   console.log(file);
  
    // //   const newUser = this.userRepository.create({
    // //     ...userData,
    // //     Image: file.filename, // save the filename in the database
    // //   });
  
    // //   await this.userRepository.save(newUser);
    //   return file;
    // }

    @Post('/add')
    @UseInterceptors(
      FilesInterceptor('files', 10, {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const dest = process.env.Banner_Image_Destination;
            const resolvedDest = resolve(dest); // Make sure path is absolute
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
    async add(@UploadedFiles() files: Express.Multer.File[], @Req() req: any): Promise<boolean> {
      const eventLink = req.body.EventLink;
      
      const bannerData = files.map(file => ({
        fileName: file.filename,
        path: file.path,  // Normalize the path to use forward slashes
        eventLink: eventLink,
      }));
      
      return await this.BannerService.addMultiple(bannerData);
    }
    
    @Get('/all')
    async getAllBanners(): Promise<any> {

  //  async getAllBanners(@Res() res: Response): Promise<any> {
        return await this.BannerService.getAll();
    //   try {
        //const banners = await this.BannerService.getAll();
  
    //     for (const banner of banners) {
    //       const filePath = join(__dirname, '..', '..', 'uploads', banner.FileName);
  
    //       // Determine Content-Type based on file extension
    //       const contentType = this.getContentType(filePath);
  
    //       if (contentType) {
    //         res.setHeader('Content-Type', contentType);
    //       }
  
    //       // Use try-catch for better error handling
    //       try {
    //         res.sendFile(filePath, (err) => {
    //           if (err) {
    //             console.error('Error sending file:', err);
    //             res.status(404).send('File not found'); // Handle specific errors, like file not found
    //           } else {
    //             console.log('File sent successfully:', banner.FileName);
    //           }
    //         });
    //       } catch (error) {
    //         console.error('Error sending file:', error);
    //         res.status(500).send('Internal Server Error');
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error fetching banners:', error);
    //     res.status(500).send('Internal Server Error');
    //   }
    }
  
    // Function to determine Content-Type based on file extension
    private getContentType(filePath: string): string | undefined {
      const ext = filePath.split('.').pop()?.toLowerCase(); // Get file extension
  
      switch (ext) {
        case 'jpeg':
        case 'jpg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'gif':
          return 'image/gif';
        // Add more cases for other file types as needed
        default:
          return 'application/octet-stream'; // Default to binary stream if type is unknown
      }
    }
}
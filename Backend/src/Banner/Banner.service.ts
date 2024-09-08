import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BannerEntity } from './Banner.entity';
import * as path from 'path';
import * as fs from 'fs';
import { normalize } from 'path';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private BannerRepo: Repository<BannerEntity>,
  ) { }
  getHello(): string {
    return 'Hello Banner!';
  }
  async findById(id: number): Promise<BannerEntity | null> {
    let BannerEntity = await this.BannerRepo.findOne({ where: { Id: id } });
    if (BannerEntity != null) {
      return BannerEntity;
    }
    return null;
  }

  async addMultiple(bannerData: { fileName: string; path: string; eventLink: string }[]): Promise<boolean> {
    await this.removeAllFromFolder();
  
    const banners = bannerData.map(data => {
      const banner = new BannerEntity();
      banner.FileName = data.fileName;
      banner.path = data.path;
      banner.EventLink = data.eventLink;  // Ensure EventLink is provided
      return banner;
    });
  
    const savedBanners = await this.BannerRepo.save(banners);
    return savedBanners.length > 0;
  }
  
async removeAllFromFolder(): Promise<boolean> {
  try {
    const banners = await this.BannerRepo.find();

    // Clear database records
    await this.BannerRepo.clear();

    // Delete files from the uploads directory
    for (const banner of banners) {
      const filePath = path.resolve(__dirname, '../../', banner.path);
      console.log(`Attempting to delete file: ${filePath}`);
      try {
        await fs.promises.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      }
    }

    return true;
  } catch (error) {
    console.error('Error clearing Banner table:', error);
    return false;
  }
}

  async removeAll(): Promise<boolean> {
    try {
      await this.BannerRepo.clear();
      return true;
    } catch (error) {
      console.error('Error clearing Banner table:', error);
      return false;
    }
  }

  async getAll(): Promise<any[]> {
    const response = await this.BannerRepo.find();
    
    const updatedResponse = response.map(item => {
      const userImage = normalize(item.path).replace(/\\/g, '/');
      return {
        ...item,
        path: userImage
      };
    });
  
    return updatedResponse;
  }
  

//   async serveImage(fileName: string, res: any) {
//     const filePath = path.join(__dirname, '../../', 'uploads', fileName);
//     res.sendFile(filePath, (err) => {
//       if (err) {
//         console.error('Error sending file:', err);
//         return res.status(404).send('Image not found');
//       }
//     });
//   }

}

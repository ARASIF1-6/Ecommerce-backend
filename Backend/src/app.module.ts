import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/User.module';
import { ProductModule } from './Product/Product.module';
import { CartModule } from './Cart/Cart.module';
import { OrderModule } from './Order/Order.module';
import { CategoryModule } from './Category/Category.module';
import { APP_GUARD } from '@nestjs/core';
import { OrderHistoryMapperModule } from './Mapper/Order History Mapper/OHM.module';
import { ProductOrderMapperModule } from './Mapper/ProductOrderMapper/ProductOrderMapper.module';
import { PaymentModule } from './Payment/Payment.module';
import { DiscountModule } from './Product/Discount/Discount.module';
import { CollectionModule } from './Collection/Collection.module';
import { ProductCollectionMapperModule } from './Mapper/Product Collection Mapper/PCM.module';
import { BannerModule } from './Banner/Banner.module';
import { ReviewRatingModule } from './Review And Rating/ReviewRating.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WishListModule } from './WishList/WishList.module';
import { AuthModule } from './Auth/Auth.module';
import { RedisModule } from './Auth/Redis/redis.module';
import { EmailOTPModule } from './EmailOTP/EmailOTP.module';
import { JwtGaurd } from './Auth/Gaurds/jwt-auth.gaurd';
import { ChatModule } from './Real Time Chat/chat.module';
import { GraphModule } from './Graph/Graph.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule, ProductModule, CartModule, OrderModule, 
    AuthModule,
    CategoryModule, OrderHistoryMapperModule, ProductOrderMapperModule,
    PaymentModule, DiscountModule, CollectionModule, ProductCollectionMapperModule,
    BannerModule, 
    RedisModule, 
    ReviewRatingModule,WishListModule, 
    EmailOTPModule,ChatModule,GraphModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
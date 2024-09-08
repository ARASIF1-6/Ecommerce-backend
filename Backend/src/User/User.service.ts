import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './User.entity';
import * as bcrypt from 'bcrypt';
import { normalize } from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ){}
  getHello(): string {
    return 'Hello User!';
  }
  async SearchByID(Id:number):Promise<UserEntity|null>
  {
    let userEntity = await this.userRepo.findOne({ where: { Id } });
    if(userEntity!=null)
    {
      const userImage=normalize(userEntity.Image).replace(/\\/g, '/');
      userEntity.Image=userImage;
      return userEntity;
    }
    return null;
  }
  async findByEmail(email:string):Promise<UserEntity|null>
  {
    // console.log("email:"+email)

    let user = await this.userRepo.findOne({where:{email:email}});
    if(user!=null)
    {
      const userImage=normalize(user.Image).replace(/\\/g, '/');
      user.Image=userImage;
      // console.log("Useremail:"+user.email)
      return user;
    }
    return null;

  }
  async validate(email:string, password:string):Promise<UserEntity|null>
  {
    // console.log("email:"+email)
    let findUser= await this.findByEmail(email);
    let HashPassword = await bcrypt.compare(password, findUser.password)
    // console.log("H:"+HashPassword)
    if(findUser!=null && HashPassword)
    {
      return findUser;
    }

    return null;

  }
  // async SignUp(userEntity: UserEntity): Promise<UserEntity | boolean> {
  //   try {
  //     const saltRounds = 10;
  //     userEntity.password = await bcrypt.hash(userEntity.password, saltRounds);
  
  //     const UserDetails = await this.userRepo.save(userEntity);
  //     console.log('User saved:', JSON.stringify(UserDetails));
  //     if (UserDetails != null) {
  //       return UserDetails;
  //     }
  
  //     return null;
  //   } catch (error) {
  //     console.error('Error caught in SignUp:', error); // Log the error details
  //     if (error.code === '23505') {
  //       throw new ConflictException('Email already exists');
  //     }
  //     throw error;
  //   }
  // }
  async SignUp(userEntity: UserEntity): Promise<UserEntity | boolean> {
    try {
      const saltRounds = 10;
      userEntity.password = await bcrypt.hash(userEntity.password, saltRounds);
  
      console.log('Attempting to save user:', JSON.stringify(userEntity));
  
      // Attempt to save the user
      const UserDetails = await this.userRepo.save(userEntity);
      console.log('User saved:', JSON.stringify(UserDetails));
      
      if (UserDetails) {
        return UserDetails;
      }
  
      return null;
    } catch (error) {
      console.error('Error caught in SignUp:', error);
  
      // Handle unique constraint violation for email
      if (error.code === '23505') { 
        throw new ConflictException('Email already exists');
      }
      
      // Re-throw other unexpected errors
      throw error;
    }
  }
  
  
  
}

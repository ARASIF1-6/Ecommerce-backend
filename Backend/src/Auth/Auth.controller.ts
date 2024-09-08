import { Body, Controller, Post, UseGuards, Request, UseInterceptors, UploadedFile, Req, ExecutionContext, InternalServerErrorException, HttpStatus, HttpException } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { UserEntity } from "src/User/User.entity";
import { LocalGaurd } from "./Gaurds/local-auth.gaurd";
import { use } from "passport";
import { refreshJwtGaurd } from "./Gaurds/refresh-jwt-auth.gaurd";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { JwtGaurd } from "./Gaurds/jwt-auth.gaurd";
import { extname, resolve } from "path";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalGaurd)
    @Post('login')
    async login(@Body() userEntity: UserEntity, @Request() req) {
        // console.log("ewasdcasd  :"+req.user.name)
        return await this.authService.login(req.user);
        //  return await this.authService.validateUser(userEntity.email,userEntity.password)

    }
    @Post('signup')
    async SignUp(@Body() userEntity: UserEntity) {
        return await this.authService.SignUpOTPCheck(userEntity);

    }
    @Post('/SignupVerifyOTP')
    async checkOtp(@Body('email') email: string, @Body('otp') otp: string): Promise<any> {
      return await this.authService.Signup(email,otp);
    
    }
    @UseGuards(JwtGaurd)
    @UseGuards(refreshJwtGaurd)
    @Post('/RefreshToken')
    async RefreshToken(@Body('refreshToken') refreshToken: string,@Request() req) {
      return await this.authService.RefreshToken(refreshToken,req); //need to delete previous token
    }
    @UseGuards(JwtGaurd)
    @Post('logout')
    async logout(@Request() req) {
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            await this.authService.logout(token);
            return { message: 'Logout successful' };
        } else {
            return { message: 'Authorization header missing' };
        }
    }

    @Post('GoogleAuth')
    @UseInterceptors(FileInterceptor('googlePic',
      {
          fileFilter: (req, file, cb) => {
              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                  cb(null, true);
              else {
                  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
              }
          },
          limits: { fileSize: 100000 },
          storage: diskStorage({
            destination: (req, file, cb) => {
                const dest = process.env.Auth_Image_Destination;
                const resolvedDest = resolve(dest); // Ensure the path is absolute
                cb(null, resolvedDest);
              },             
              filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = extname(file.originalname); 
                const filename = `${uniqueSuffix}${extension}`; 
                cb(null, filename);
              },
          })
      }
  ))
    async GoogleAuth(@Body() logindata: any, @UploadedFile() myfile: Express.Multer.File) {
      try{
        logindata.Image = myfile.path;
        console.log(logindata);
        const result = await this.authService.GoogleAuth(logindata);
        if(result){
        
          return result;
        }
        else
        {
          throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED); 
        }
      }
      catch(error){
        console.error('Error during GoogleAuth:', error); 
        throw new InternalServerErrorException("Failed to login");
      }
    }
    
} 
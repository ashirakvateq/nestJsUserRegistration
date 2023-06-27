import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async SignIn(user: any): Promise<{ user: ResponseUserDto; access_token: string }>{
    const currentUser = await this.usersService.findbyEmail(user.email);

    if(currentUser.userName){
      const isMatch = await this.usersService.checkPassword(currentUser.password, user.password);
      if(isMatch){
        const confirmUser = new ResponseUserDto(
          currentUser.id,
          currentUser.userName,
          currentUser.email,
          currentUser.createdAt,
          currentUser.updatedAt,
        );
        
        return {
          user: confirmUser,
          access_token: await this.jwtService.signAsync(user),
        }
      }
      else{
        throw new BadRequestException('Invalid password');
      }
    }else{
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async signUp(user: any){
    return this.usersService.registerUser(user).then((newUser) => {
      return newUser;
    }).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }

  async googleLogin(req: any){
    if(!req.user){
      return {
        status: 404,
        message: "No user found from google"
      };
    }

    return this.usersService.CreateUser(req.user).then((res) =>{
      return {
        message: "User info from google",
        user: res
      }
    }).catch(e => {
      return e.message;
    })

  }
}
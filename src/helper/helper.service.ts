import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class HelperService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async GetUserByToken(accesstoken: any, relations?: any[]) {
    const tokenPayload = await this.decodeToken(accesstoken);
    if (tokenPayload) {
      try {
        return await this.userService.findUserByEmail(
          tokenPayload['email'],
        );
      } catch (error) {
        throw error;
      }
    } else {
      throw new BadRequestException('Invalid Token');
    }
  }

  async decodeToken(accessToken: string) {
    if (accessToken) {
      return this.jwtService.decode(accessToken.split('Bearer ')[1]);
    } else {
      return null;
    }
  }
}

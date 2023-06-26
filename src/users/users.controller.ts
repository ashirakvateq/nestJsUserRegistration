import { Controller, Get, Headers, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Headers('Authorization') token: string) {
        return await this.userService.getProfile(token);
    }
}

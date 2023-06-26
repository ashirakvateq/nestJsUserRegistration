import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    async login(@Request() req) {
        const result = await this.authService.SignIn(req.body);
        return result;
    }

    @Post('sign-up')
    signUp(@Body() userData: User){
        return this.authService.signUp(userData);
    }
}
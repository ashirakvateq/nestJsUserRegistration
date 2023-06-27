import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // Initiates the Google OAuth flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        const user = this.authService.googleLogin(req);
        return user;
    }

}
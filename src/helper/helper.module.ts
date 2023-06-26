import { Module, forwardRef } from '@nestjs/common';
import { HelperService } from './helper.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
    imports:[
        forwardRef(()=> UsersModule),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [],
    providers: [HelperService],
    exports: [HelperService]
})
export class HelperModule {}

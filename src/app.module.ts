import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      name:'default',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    AuthModule, UsersModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

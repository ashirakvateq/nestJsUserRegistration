import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from './helper/helper.module';
import { config } from 'dotenv';

config(); 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: true,
    }),
    AuthModule, UsersModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

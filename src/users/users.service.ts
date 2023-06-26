import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateUser } from './dto/user.dto';
import { hashSync, compareSync } from 'bcrypt';
import { HelperService } from 'src/helper/helper.service';
import { ResponseUserDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {

    private salts: number = 10;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private helperService: HelperService,
    ) { }

    async findbyEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async checkPassword(userPassword: string, plainPassword: string): Promise<boolean> {
        return compareSync(plainPassword, userPassword);
    }

    async findbyUsername(userName: string, relations = ['role']): Promise<User> {
        return await this.userRepository.findOne({ where: { userName }, relations: relations, withDeleted: true })
            .then((res) => {
                if (!res) {
                    throw new NotFoundException('No user found with this username')
                }
                return res;
            }).catch(e => {
                return e;
            });
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email }, withDeleted: true })
            .then((res) => {
                if (!res) {
                    throw new NotFoundException('No user found with this username')
                }
                return res;
            }).catch(e => {
                return e;
            });
    }

    async registerUser(user: CreateUser): Promise<InsertResult> {
        user.password = hashSync(user.password, this.salts);
        return this.userRepository.insert([user]).then((user) => {
            return user;
        }
        ).catch(e => {
            throw new BadRequestException(e.message);
        })
    }

    async getProfile(token: string): Promise<any> {
        const user = await this.helperService.GetUserByToken(token);
        return await this.userRepository.findOne({ where: { id: user.id } }).then(async (res) => {
            const loginUser = new ResponseUserDto(
                res.id,
                res.userName,
                res.email,
                res.createdAt,
                res.updatedAt,
            );
            return loginUser;
        }).catch(e => {
            return e;
        })
    }

}
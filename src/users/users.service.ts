import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { SignUpDTO } from 'src/auth/dto/sign-up.dto';
import { UserWithoutPassword } from './users.types';
import { UsersMapper } from './users.mapper';
import { User } from './user.schema';

export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
    private readonly _usersMapper: UsersMapper,
  ) {}

  getByEmail(email: string) {
    return this._userModel.findOne({ email });
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    return this._usersMapper.toUserWithoutPassword(user);
  }

  async create(dto: SignUpDTO): Promise<UserWithoutPassword> {
    const { email, password } = dto;
    const exists = await this.getByEmail(email);

    if (exists) {
      throw new BadRequestException(`User ${email} already exists`);
    }

    const user = await this._userModel.create({
      ...dto,
      password: bcrypt.hashSync(password, 10),
    });

    return this._usersMapper.toUserWithoutPassword(user);
  }
}

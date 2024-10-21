import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { JwtPayload } from './auth.types';
import { SignInDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDTO) {
    const user = await this._usersService.create(dto);

    const accessToken = await this._generateJwt({
      _id: user._id,
      email: user.email,
      roles: user.roles,
    });

    return {
      user,
      accessToken,
    };
  }

  async signIn({ email, password }: SignInDTO) {
    const user = await this._usersService.validateCredentials(email, password);

    const accessToken = await this._generateJwt({
      _id: user._id,
      email: user.email,
      roles: user.roles,
    });

    return {
      user,
      accessToken,
    };
  }

  private _generateJwt(payload: JwtPayload) {
    return this._jwtService.signAsync(payload);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { IsPublic } from './decorators/is-public.decorator';
import { User } from 'src/users/user.schema';
import { JwtPayload } from './auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @IsPublic()
  @Post('register')
  @ApiCreatedResponse({
    description: 'Usuario creado.',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        user: {
          $ref: getSchemaPath(User),
        },
      },
    },
  })
  signUp(@Body() dto: SignUpDTO) {
    return this._authService.signUp(dto);
  }

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Usuario creado.',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        user: {
          $ref: getSchemaPath(User),
        },
      },
    },
  })
  signIn(@Body() dto: SignInDTO) {
    return this._authService.signIn(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: JwtPayload,
  })
  checkJwt(@Request() req) {
    return req.user;
  }
}

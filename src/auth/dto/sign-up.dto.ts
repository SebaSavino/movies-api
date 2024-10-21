import { IsEnum, IsOptional, IsString } from 'class-validator';

import { UserRole } from 'src/users/user.schema';
import { SignInDTO } from './sign-in.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO extends SignInDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Sebastian Savino',
    required: false,
    nullable: true,
  })
  name?: string;

  @IsOptional()
  @IsEnum(UserRole, {
    each: true,
  })
  @ApiProperty({
    required: false,
    enum: UserRole,
    nullable: true,
    isArray: true,
  })
  roles?: UserRole[];
}

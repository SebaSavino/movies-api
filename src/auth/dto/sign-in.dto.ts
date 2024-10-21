import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'sebastian.savino@gmail.com'
  })
  email: string;

  @IsString()
  @Length(5, 50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must have a uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: 'Contraseña con mayúsculas, minúsculas y números',
  })
  password: string;
}

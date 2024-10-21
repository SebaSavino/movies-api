import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/users/user.schema';

export class JwtPayload {
  @ApiProperty()
  _id: string;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty({
    isArray: true,
    enum: UserRole,
  })
  roles: UserRole[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
  })
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  director: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  producer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  releaseDate: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'User Email',
    example: 'user@example.com',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 255)
  email: string;

  @ApiProperty({
    type: 'string',
    format: 'password',
    description: 'User Password',
    example: 'qwe123',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @ApiProperty({
    type: 'string',
    format: 'name',
    description: 'User Name',
    example: 'Jon Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;
}

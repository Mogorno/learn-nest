import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestDto {
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
}

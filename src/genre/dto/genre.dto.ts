import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre name',
    required: true,
    example: 'Action',
  })
  @IsString()
  @Length(2, 100)
  name: string;
}

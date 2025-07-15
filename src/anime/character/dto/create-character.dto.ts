import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsOptional()
  @IsString()
  description?: string;
}

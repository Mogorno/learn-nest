import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ActorsIdsDto } from 'src/actor/dto/actors-ids.dto';

export class MovieDto extends ActorsIdsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  releaseYear: Date;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  @MinLength(3)
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;
}

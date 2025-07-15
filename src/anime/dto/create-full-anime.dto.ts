import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnimeDto } from './create-anime.dto';
import { CreatePosterDto } from '../poster/dto';
import { CreateSeasonDto } from '../season/dto';
import { CreateCharacterDto } from '../character/dto';

export class CreateFullAnimeDto extends CreateAnimeDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePosterDto)
  poster?: CreatePosterDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSeasonDto)
  seasons?: CreateSeasonDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCharacterDto)
  characters?: CreateCharacterDto[];

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres?: string[];
}

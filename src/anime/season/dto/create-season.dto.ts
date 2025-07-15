import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateEpisodeDto } from 'src/anime/season/episode/dto';

export class CreateSeasonDto {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 1024)
  description?: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEpisodeDto)
  episodes?: CreateEpisodeDto[];
}

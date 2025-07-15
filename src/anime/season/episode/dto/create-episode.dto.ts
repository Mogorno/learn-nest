import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 1024)
  description?: string;
}

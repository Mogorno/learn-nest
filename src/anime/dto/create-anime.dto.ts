import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

enum AnimeStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  ANNOUNCED = 'ANNOUNCED',
}

export class CreateAnimeDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @IsOptional()
  @IsString()
  @Length(3, 1024)
  description?: string;

  @IsEnum(AnimeStatus)
  @IsOptional()
  status?: AnimeStatus;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

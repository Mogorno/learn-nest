import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class ReviewDto {
  @IsString()
  @Length(3, 255)
  text: string;

  @Min(0)
  @Max(10)
  @IsNumber({ maxDecimalPlaces: 1 })
  @IsOptional()
  rating: number;

  @IsUUID('4')
  movieId: string;
}

import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePosterDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;
}

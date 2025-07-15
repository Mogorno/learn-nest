import { IsString, MaxLength, MinLength } from 'class-validator';

export class ActorDto {
  @IsString()
  @MaxLength(64)
  @MinLength(2)
  name: string;
}

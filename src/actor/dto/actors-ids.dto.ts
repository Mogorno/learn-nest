import { IsArray, IsUUID } from 'class-validator';

export class ActorsIdsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];
}

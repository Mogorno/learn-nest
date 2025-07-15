import { IsArray, IsUUID } from 'class-validator';

export class UUIDListDto {
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}

export function UUIDListDtoFactory<T extends string>(propertyName: T) {
  class DynamicUUIDListDto {
    @IsArray()
    @IsUUID('4', { each: true })
    [propertyName]: string[];
  }

  return DynamicUUIDListDto;
}

import { type ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class StringToLowercasePipe implements PipeTransform {
  transform<T>(value: T, metadata: ArgumentMetadata) {
    if (value && typeof value === 'object' && metadata.type === 'body') {
      for (const key in value) {
        if (typeof value[key] === 'string') {
          value[key as string] = value[key].toLowerCase();
        }
      }
    }
    return value;
  }
}

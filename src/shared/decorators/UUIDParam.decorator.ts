import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { validateSync, IsUUID } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

export function UUIDParam(paramName: string) {
  class UUIDCheck {
    @IsUUID('4')
    [paramName]: string;
  }

  return createParamDecorator((_, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const value = request.params[paramName];

    const instance = plainToInstance(UUIDCheck, { [paramName]: value });
    const errors = validateSync(instance);

    if (errors.length > 0) {
      throw new BadRequestException(
        `Parameter "${paramName}" must be a valid UUID v4`,
      );
    }

    return value;
  })();
}

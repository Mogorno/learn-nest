import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

export function Authorization() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}

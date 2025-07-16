import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ):
    | Observable<{ data: T; status: number }>
    | Promise<Observable<{ data: T; status: number }>> {
    return next.handle().pipe(map((data) => ({ data: data, status: 200 })));
  }
}

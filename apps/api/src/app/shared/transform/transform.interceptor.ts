import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Response<T> {
  results?: T[];
  result?: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      map((results: any) => {
        const common = {
          timestamp: Date.now(),
          count: Array.isArray(results) ? results.length : results ? 1 : 0,
        };
        return Object.assign(
          {},
          common,
          Array.isArray(results) ? { results } : { result: results }
        );
      })
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { EntityQuery } from "../entity-query/entity-query";

@Injectable()
export class QueryParserInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const parser = new MongooseQueryParser();
    const req: Request = context.switchToHttp().getRequest();
    req.query = parser.parse(req.query) as EntityQuery<any>;
    req.query.limit = !req.query.limit ? 100 : Math.min(req.query.limit, 100);

    return next.handle();
  }
}

import { Observable } from 'rxjs';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { DistilleryService } from './distillery.service';
import { DistilleryDto } from './dto/distillery.dto';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController {
  constructor(private distilleryService: DistilleryService) {}

  @Get('')
  @ApiQuery({ type: EntityQuery })
  getMany(
    @Query() query: EntityQuery<DistilleryDto>
  ): Observable<DistilleryDto[]> {
    const { filter, ...options } = query;
    console.log(JSON.stringify(filter), JSON.stringify(options));
    return this.distilleryService.getMany(filter, options);
  }
}

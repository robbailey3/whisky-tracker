import { ObjectID } from 'mongodb';
import { Observable } from 'rxjs';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { DistilleryService } from './distillery.service';
import { DistilleryDto } from './dto/distillery.dto';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController {
  constructor(private distilleryService: DistilleryService) {}

  @Get('')
  @ApiQuery({ type: EntityQuery })
  find(
    @Query() query: EntityQuery<DistilleryDto>
  ): Observable<DistilleryDto[]> {
    const { filter, ...options } = query;
    return this.distilleryService.find(filter, options);
  }

  @Get(':id')
  public findOne(@Param('id') _id: string) {
    if (!ObjectID.isValid(_id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.distilleryService.findOne({
      _id: ObjectID.createFromHexString(_id)
    });
  }
}

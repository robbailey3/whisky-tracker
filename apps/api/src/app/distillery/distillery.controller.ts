import { ObjectID } from 'mongodb';
import { Observable } from 'rxjs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Patch,
  Delete,
  OnModuleInit,
  UseInterceptors
} from '@nestjs/common';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { DistilleryService } from './distillery.service';
import { DistilleryDto } from './dto/distillery.dto';
import { LocationQuery } from '../shared/entity-query/location-query';
import { QueryParserInterceptor } from '../shared/query-parser/query-parser.interceptor';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController implements OnModuleInit {
  constructor(private distilleryService: DistilleryService) {}

  public onModuleInit() {
    this.distilleryService.createGeoIndex();
  }

  @Get('')
  @ApiQuery({ type: EntityQuery })
  @UseInterceptors(QueryParserInterceptor)
  @ApiOperation({
    description: 'Find multiple Distillery documents from the database',
    summary: 'Find Distilleries'
  })
  @ApiOkResponse({ type: [DistilleryDto] })
  public find(
    @Query() query: EntityQuery<DistilleryDto>
  ): Observable<DistilleryDto[]> {
    const { filter, ...options } = query;
    return this.distilleryService.find(filter, options);
  }

  @Get('location')
  @ApiQuery({ type: LocationQuery })
  @ApiOperation({
    description:
      'Find multiple Distillery documents from the database which are within a given distance of a particular location',
    summary: 'Find Distilleries'
  })
  @ApiOkResponse({ type: [DistilleryDto] })
  public findByLocation(@Query() query: LocationQuery) {
    return this.distilleryService.findByLocation(
      query.lat,
      query.lng,
      query.maxDistance,
      query.minDistance
    );
  }

  @Get(':id')
  @ApiOperation({
    description: 'Find a single Distillery document from the database',
    summary: 'Find Distillery'
  })
  public findOne(@Param('id') _id: string) {
    if (!ObjectID.isValid(_id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.distilleryService.findOne({
      _id: ObjectID.createFromHexString(_id)
    });
  }

  @Post('')
  @ApiOperation({
    description: 'Insert a Distillery document into the database',
    summary: 'Insert Distillery'
  })
  @ApiCreatedResponse({ type: DistilleryDto })
  public insertOne(@Body() newDistillery: DistilleryDto) {
    return this.distilleryService.insertOne(newDistillery);
  }

  @Patch(':id')
  public findOneAndUpdate(
    @Param('id') id: string,
    @Body() updatedDistillery: DistilleryDto
  ) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.distilleryService.findOneAndUpdate<DistilleryDto>(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { ...updatedDistillery } }
    );
  }

  @Delete(':id')
  public deleteOne(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.distilleryService.deleteOne({
      _id: ObjectID.createFromHexString(id)
    });
  }
}

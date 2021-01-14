import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { WhiskyDto } from './dto/whisky.dto';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { WhiskyService } from './whisky.service';

@Controller('whisky')
@ApiTags('Whisky')
export class WhiskyController {
  constructor(private readonly whiskyService: WhiskyService) {}

  @Get('')
  @ApiQuery({ name: 'Query', type: EntityQuery, required: false })
  @ApiOperation({
    description:
      'Retrieves all whiskies from the database which match a given query',
    summary: 'Get Whiskies'
  })
  @ApiOkResponse({
    description: 'An array of whiskies which match the given query',
    type: [WhiskyDto]
  })
  getMany(@Query() query: EntityQuery<WhiskyDto>) {
    const { filter, ...options } = query;
    return this.whiskyService.getMany(filter, options);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Retrieves a single whisky from the database',
    summary: 'Get Whiskies'
  })
  @ApiOkResponse({
    description: 'A single whisky with the ID provided',
    type: WhiskyDto
  })
  @ApiParam({
    name: 'ID',
    type: String,
    description: 'The ID of the single whisky to retrieve'
  })
  getOne(@Param('id') _id: string) {
    return this.whiskyService.getOne(
      { _id: ObjectID.createFromHexString(_id) },
      {}
    );
  }
}

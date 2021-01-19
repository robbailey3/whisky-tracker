import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  BadRequestException,
  Delete,
  Patch,
  UseInterceptors
} from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { WhiskyDto } from './dto/whisky.dto';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { WhiskyService } from './whisky.service';
import { QueryParserInterceptor } from '../shared/query-parser/query-parser.interceptor';

@Controller('whisky')
@ApiTags('Whisky')
export class WhiskyController {
  constructor(private readonly whiskyService: WhiskyService) {}

  @Get('')
  @UseInterceptors(QueryParserInterceptor)
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
  public find(@Query() query: EntityQuery<WhiskyDto>) {
    const { filter, ...options } = query;
    return this.whiskyService.find(filter, options);
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
  public findOne(@Param('id') _id: string) {
    if (!ObjectID.isValid(_id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.findOne({
      _id: ObjectID.createFromHexString(_id)
    });
  }

  @Post('')
  @ApiBody({
    description: 'The new Whisky to add to the database',
    required: true
  })
  public insertOne(@Body() body: Partial<WhiskyDto>) {
    return this.whiskyService.insertOne(body);
  }

  @Patch(':id')
  public updateOne(@Param('id') id: string, @Body() updatedWhisky: WhiskyDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.updateOne(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { updatedWhisky } }
    );
  }

  @Delete(':id')
  public deleteOne(@Param('id') id: string) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.deleteOne({
      _id: ObjectID.createFromHexString(id)
    });
  }
}

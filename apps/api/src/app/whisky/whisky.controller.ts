import {
  ApiBearerAuth,
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
  UseInterceptors,
  Req,
  UseGuards,
  Logger
} from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { AuthGuard } from '@nestjs/passport';
import { WhiskyDto } from './dto/whisky.dto';
import { EntityQuery } from '../shared/entity-query/entity-query';
import { WhiskyService } from './whisky.service';
import { QueryParserInterceptor } from '../shared/query-parser/query-parser.interceptor';
import { ReviewDto } from './dto/review.dto';
import { ProfileDto } from './dto/profile.dto';

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

  @Get('favourites/:id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: false })
  public getFavourites(@Param('id') idParam: string, @Req() req: any) {
    let id: string;
    if (!idParam) {
      id = req.user.id;
    } else {
      id = idParam;
    }

    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.getUsersFavouriteWhiskies(
      ObjectID.createFromHexString(id)
    );
  }

  @Get('current/:id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: false })
  public getCurrent(@Param('id') idParam: string, @Req() req: any) {
    let id: string;
    if (!idParam) {
      id = req.user.id;
    } else {
      id = idParam;
    }

    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.getUsersCurrentWhiskies(
      ObjectID.createFromHexString(id)
    );
  }

  @Get('wishlist/:id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: false })
  public getWishlist(@Param('id') idParam: string, @Req() req: any) {
    let id: string;
    if (!idParam) {
      id = req.user.id;
    } else {
      id = idParam;
    }

    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.getUsersWishlist(
      ObjectID.createFromHexString(id)
    );
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
    required: true,
    type: WhiskyDto
  })
  public insertOne(@Body() body: WhiskyDto) {
    return this.whiskyService.insertOne(body);
  }

  @Patch(':id')
  public updateOne(@Param('id') id: string, @Body() updatedWhisky: WhiskyDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $set: { updatedWhisky } }
    );
  }

  @Patch(':id/review')
  public addReview(@Param('id') id: string, @Body() review: ReviewDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    review._id = new ObjectID();
    return this.whiskyService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $push: { reviews: review } }
    );
  }

  @Patch(':id/profile')
  public addProfile(@Param('id') id: string, @Body() profile: ProfileDto) {
    if (!ObjectID.isValid(id)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    profile._id = new ObjectID();
    return this.whiskyService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $push: { profiles: profile } }
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

  @Delete(':id/review/:reviewId')
  public deleteReview(
    @Param('id') id: string,
    @Param('reviewId') reviewId: string
  ) {
    if (!ObjectID.isValid(id) || !ObjectID.isValid(reviewId)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $pull: { reviews: { _id: ObjectID.createFromHexString(reviewId) } } }
    );
  }

  @Delete(':id/profile/:profileId')
  public deleteProfile(
    @Param('id') id: string,
    @Param('profileId') profileId: string
  ) {
    if (!ObjectID.isValid(id) || !ObjectID.isValid(profileId)) {
      throw new BadRequestException('Provided id must be a valid id');
    }
    return this.whiskyService.findOneAndUpdate(
      { _id: ObjectID.createFromHexString(id) },
      { $pull: { profiles: { _id: ObjectID.createFromHexString(profileId) } } }
    );
  }
}

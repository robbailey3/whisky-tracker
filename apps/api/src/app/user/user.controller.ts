import { EntityQuery } from './../shared/entity-query/entity-query';
import { classToPlain, plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOkResponse({ type: [UserDto] })
  public find(@Query() query: EntityQuery<UserDto>): Observable<UserDto[]> {
    const { filter, ...options } = query;
    return this.userService
      .find<UserDto>(filter, options)
      .pipe(map((users) => users.map((user) => plainToClass(UserDto, user))));
  }

  @Post('')
  @ApiBody({ type: UserDto })
  public insertUser(@Body() user: UserDto) {
    return this.userService.insertUser(user).pipe(
      map((newUser) => {
        return plainToClass(UserDto, newUser);
      })
    );
  }
}

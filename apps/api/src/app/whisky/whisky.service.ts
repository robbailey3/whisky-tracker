import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { WhiskyDto } from './dto/whisky.dto';

@Injectable()
export class WhiskyService extends EntityService {
  constructor(
    database: DatabaseService,
    private readonly userService: UserService
  ) {
    super(database, 'whisky');
  }

  public getUsersFavouriteWhiskies(userID: ObjectID): Observable<WhiskyDto[]> {
    return this.userService
      .findOne<UserDto>({ _id: userID })
      .pipe(
        switchMap((user) => {
          if (!user || !user.favourites) {
            return of([]);
          }
          return this.find<WhiskyDto>({
            _id: { $in: [...user.favourites] }
          });
        })
      );
  }

  public getUsersCurrentWhiskies(userID: ObjectID): Observable<WhiskyDto[]> {
    return this.userService
      .findOne<UserDto>({ _id: userID })
      .pipe(
        switchMap((user) => {
          if (!user || !user.currentWhiskies) {
            return of([]);
          }
          return this.find<WhiskyDto>({
            _id: { $in: [...user.currentWhiskies] }
          });
        })
      );
  }
}

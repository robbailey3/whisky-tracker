import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../shared/database/database.service';
import { UserDto } from './dto/user.dto';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class UserService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'users');
  }

  public insertUser(newUser: UserDto): Observable<UserDto> {
    return from(bcrypt.hash(newUser.password, 12)).pipe(
      switchMap((hashedPassword) => {
        const userWithoutPassword = { password: hashedPassword, ...newUser };
        const user = {
          password: hashedPassword,
          ...userWithoutPassword
        } as UserDto;
        console.log(user);
        return super.insertOne<UserDto>(user);
      })
    );
  }
}

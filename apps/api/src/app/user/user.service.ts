import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { DatabaseService } from '../shared/database/database.service';
import {
  FilterQuery,
  FindOneOptions,
  UpdateOneOptions,
  UpdateQuery,
} from 'mongodb';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  public getAll<T>(
    query: FilterQuery<any> = {},
    options: FindOneOptions<any> = {}
  ): Observable<T[]> {
    return this.db.setCollection('users').find<T>(query, options);
  }

  public getOne(
    query: FilterQuery<any> = {},
    options: FindOneOptions<any> = {}
  ) {
    return this.db.setCollection('users').findOne(query, options);
  }

  public async create(newUser: Partial<UserDto>): Promise<Partial<UserDto>> {
    newUser.password = await bcrypt.hash(newUser.password, 12);
    return await this.db
      .setCollection('users')
      .insertOne<Partial<UserDto>>(newUser)
      .toPromise();
  }

  public findAndUpdateOne(
    selector: FilterQuery<any>,
    updateOperation: UpdateQuery<UserDto>,
    options: UpdateOneOptions = {}
  ) {
    return this.db
      .setCollection('users')
      .findOneAndUpdate(selector, updateOperation, options);
  }
}

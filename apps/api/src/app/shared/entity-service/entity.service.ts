import {
  CollectionInsertOneOptions,
  FilterQuery,
  FindOneOptions,
  UpdateOneOptions,
  UpdateQuery,
} from 'mongodb';
import { DatabaseService } from './../database/database.service';
export abstract class EntityService {
  constructor(
    private readonly database: DatabaseService,
    private readonly collectionName: string
  ) {}

  public getMany<T>(
    query: FilterQuery<T>,
    options: FindOneOptions<T extends any ? any : T> = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .find<T>(query, options);
  }

  public getOne<T>(
    query: FilterQuery<T>,
    options: FindOneOptions<T extends any ? any : T>
  ) {
    return this.database
      .setCollection(this.collectionName)
      .findOne(query, options);
  }

  public insertOne<T>(
    newDocument: T,
    options: CollectionInsertOneOptions = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .insertOne(newDocument, options);
  }

  public updateOne<T>(
    filter: FilterQuery<T>,
    updatedDocument: UpdateQuery<T>,
    options: UpdateOneOptions = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .updateOne(filter, updatedDocument, options);
  }
}

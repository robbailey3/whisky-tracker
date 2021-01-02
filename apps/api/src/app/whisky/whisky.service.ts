import { DatabaseService } from './../shared/database/database.service';
import { Injectable } from '@nestjs/common';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class WhiskyService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'whisky');
  }
}

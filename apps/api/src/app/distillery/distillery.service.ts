import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class DistilleryService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'distillery');
  }
}

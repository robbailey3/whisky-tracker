import { Injectable } from '@nestjs/common';
import { FilterQuery, FindOneOptions } from 'mongodb';
import { switchMap } from 'rxjs/operators';

import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';
import { DistilleryDto } from './dto/distillery.dto';

@Injectable()
export class DistilleryService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'distillery');
  }

  public findByLocation(
    lat: number,
    lng: number,
    maxDistance: number,
    minDistance: number
  ) {
    return this.database
      .setCollection(this.collectionName)
      .find<DistilleryDto>({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lat, lng]
            },
            $maxDistance: maxDistance,
            $minDistance: minDistance
          }
        }
      });
  }

  public createGeoIndex() {
    return this.database.isLoaded.pipe(
      switchMap(() =>
        this.database
          .setCollection(this.collectionName)
          .createIndex({ location: '2dsphere' } as any)
      )
    );
  }
}

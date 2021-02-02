import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectID } from 'mongodb';
import { Observable } from 'rxjs';
import { DatabaseService } from '../shared/database/database.service';
import { UserService } from '../user/user.service';
import { WhiskyService } from './whisky.service';

jest.mock('../shared/database/database.service.ts');
jest.mock('../user/user.service.ts');

describe('WhiskyService', () => {
  let service: WhiskyService;
  let databaseService: DatabaseService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiskyService, DatabaseService, ConfigService, UserService]
    }).compile();

    service = module.get<WhiskyService>(WhiskyService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    userService = module.get<UserService>(UserService);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    databaseService.setCollection = (_collectionName: string) => {
      return databaseService;
    };
    userService.findOne = jest.fn().mockReturnValue(new Observable());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: getUsersFavouriteWhiskies', () => {
    let findSpy: jest.SpyInstance;

    beforeEach(() => {
      findSpy = jest.spyOn(userService, 'findOne');
      findSpy.mockReturnValue(new Observable());
    });
    it('should be defined', () => {
      expect(service.getUsersFavouriteWhiskies).toBeDefined();
    });

    it('should call userService->findOne', () => {
      service.getUsersFavouriteWhiskies(new ObjectID());

      expect(findSpy).toHaveBeenCalled();
    });

    it('should call userService->findOne with an _id search', () => {
      const objectID = new ObjectID();
      service.getUsersFavouriteWhiskies(objectID);

      expect(findSpy).toHaveBeenCalledWith({ _id: objectID });
    });
  });
});

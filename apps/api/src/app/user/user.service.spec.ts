import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { of } from 'rxjs';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

jest.mock('../shared/database/database.service.ts');
jest.mock('../shared/entity-service/entity.service');

describe('UserService', () => {
  let service: UserService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DatabaseService]
    }).compile();

    service = module.get<UserService>(UserService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    databaseService.setCollection = (_collectionName: string) => {
      return databaseService;
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: insertUser', () => {
    it('should be defined', () => {
      expect(service.insertUser).toBeDefined();
    });
    it('should call bcrypt->hash with the new users password', () => {
      const spy = jest.spyOn(bcrypt, 'hash'); // Spy on the hash method

      // Create a mock user
      const newUser = new UserDto();
      newUser.password = 'superSecretPassword';

      // Call the method we're testing
      service.insertUser(newUser);

      // Check things are correct
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(newUser.password, 12);
    });

    it('should pass the hashed password and user to this->insertOne', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('Hello');

      // Create a mock user
      const newUser = new UserDto();
      newUser.password = 'superSecretPassword';

      const expectedUser = {
        password: 'Hello'
      } as UserDto;

      const insertOneSpy = jest
        .spyOn(EntityService.prototype, 'insertOne')
        .mockReturnValue(of(expectedUser));

      // Call the method we're testing
      await service.insertUser(newUser).toPromise();

      expect(insertOneSpy).toHaveBeenCalled();
      expect(insertOneSpy).toHaveBeenCalledWith(expectedUser);
    });
  });
});

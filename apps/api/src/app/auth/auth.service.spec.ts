/* eslint-disable max-classes-per-file */
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { of } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

jest.mock('../user/user.service.ts');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        { provide: JwtService, useFactory: () => class MockJwtService {} }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: login', () => {
    it('should be defined', () => {
      expect(service.login).toBeDefined();
    });
    it('should call UserService->findOne with the email provided as a parameter', async () => {
      const hashedPassword = await bcrypt.hash('Password1', 10);
      const spy = jest.spyOn(userService, 'findOne').mockReturnValue(
        of({
          email: 'test@test.com',
          _id: new ObjectId(),
          password: hashedPassword
        })
      );

      const result = await service.login('test@test.com', 'Password1');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({
        email: 'test@test.com'
      });
    });

    it('should not throw an error for a correct password', async () => {
      const params = { email: 'test@test.com', password: 'Password1' };
      const hashedPassword = await bcrypt.hash(params.password, 10);

      jest.spyOn(userService, 'findOne').mockReturnValue(
        of({
          email: 'test@test.com',
          _id: new ObjectId(),
          password: hashedPassword,
          failedLogins: []
        })
      );
      await expect(
        service.login(params.email, params.password)
      ).resolves.not.toThrowError();
    });

    it('should throw an error for a correct password', async () => {
      const params = { email: 'test@test.com', password: 'Password1' };
      const hashedPassword = await bcrypt.hash('SomeOtherPassword', 10);

      jest.spyOn(userService, 'findOne').mockReturnValue(
        of({
          email: 'test@test.com',
          _id: new ObjectId(),
          password: hashedPassword,
          failedLogins: []
        })
      );

      await expect(
        service.login(params.email, params.password)
      ).rejects.toThrowError();
    });
  });
});

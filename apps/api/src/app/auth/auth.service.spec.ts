/* eslint-disable max-classes-per-file */
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { of } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

jest.mock('../user/user.service.ts');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService]
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

      await service.login('test@test.com', 'Password1');

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

    it('should throw an error for an incorrect password', async () => {
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

    it('should throw an error if the user has too many recent failed login requests', async () => {
      const params = { email: 'test@test.com', password: 'Password1' };
      const hashedPassword = await bcrypt.hash('Password1', 10);

      jest.spyOn(userService, 'findOne').mockReturnValue(
        of({
          email: 'test@test.com',
          _id: new ObjectId(),
          password: hashedPassword,
          failedLogins: [...Array(6).fill(Date.now())]
        })
      );

      await expect(
        service.login(params.email, params.password)
      ).rejects.toThrowError();
    });
  });

  describe('[METHOD]: createJWT', () => {
    it('should be defined', () => {
      expect(service.createJWT).toBeDefined();
    });

    it('should call userService->findOneAndUpdate', async () => {
      const testUser: LoginDto = {
        email: 'test@test.com',
        password: 'Password1'
      };

      const spy = jest.spyOn(userService, 'findOneAndUpdate').mockReturnValue(
        of({
          email: 'test@test.com',
          _id: new ObjectId(),
          failedLogins: []
        })
      );

      await service.createJWT(testUser);

      expect(spy).toHaveBeenCalled();
    });

    it('should throw an UnauthorizedError if a user is not found', async () => {
      const testUser: LoginDto = {
        email: 'test@test.com',
        password: 'Password1'
      };

      const spy = jest
        .spyOn(userService, 'findOneAndUpdate')
        .mockReturnValue(of(null));

      expect(() => service.createJWT(testUser)).rejects.toThrowError();

      expect(spy).toHaveBeenCalled();
    });

    it('should call jwtService->sign', async () => {
      const spy = jest.spyOn(JwtService.prototype, 'sign');

      const testUser: LoginDto = {
        email: 'test@test.com',
        password: 'Password1'
      };

      jest.spyOn(userService, 'findOneAndUpdate').mockReturnValue(
        of({
          email: 'test@test.com',
          _id: new ObjectId()
        })
      );

      await service.createJWT(testUser);

      expect(spy).toHaveBeenCalled();
    });
  });
});

import { DatabaseService } from './../shared/database/database.service';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindAndModifyWriteOpResultObject } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * This method is primarily used by the Passport 'local' strategy to login a user.
   * @param email The email address of the user
   * @param pass The password of the user. NOTE: This should NEVER be exposed to any logs or anything. Ever.
   */
  public async validateUser(email: string, pass: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getOne({ email }).subscribe({
        next: async (user: UserDto) => {
          if (!user || !user.password) {
            reject();
            return;
          }
          // Use bcrypt to check if the password is correct
          const passwordIsCorrect = await bcrypt.compare(pass, user.password);

          const { password, ...result } = user;
          if (passwordIsCorrect) {
            resolve(result);
          }
          reject();
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  /**
   * This method returns a JWT token for a user who has successfully logged in. This, hopefully, will be me ()
   * @param user The email and password object
   */
  public login(user: LoginDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService
        .findAndUpdateOne(
          { email: user.email },
          { $set: { lastLogIn: new Date() } },
          { upsert: true }
        )
        .subscribe({
          next: (result: FindAndModifyWriteOpResultObject<UserDto>) => {
            const userFromDB = result.value;
            if (!userFromDB) {
              // This shouldn't happen, but just in case.
              throw new UnauthorizedException('Login Failed');
            }
            // Create the JWT Payload
            const payload = { email: userFromDB.email, id: userFromDB._id };
            resolve({
              token: this.jwtService.sign(payload, {
                expiresIn: '1h',
              }),
            });
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}

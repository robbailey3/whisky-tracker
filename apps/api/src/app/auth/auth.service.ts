import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, switchMap } from 'rxjs/operators';
import { from, throwError, of } from 'rxjs';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

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
  public validateUser(email: string, pass: string): Promise<UserDto> {
    return this.userService
      .findOne({ email })
      .pipe(
        map((user: UserDto) => {
          if (!user || !user.password) {
            return throwError(new UnauthorizedException());
          }
          return user;
        }),
        switchMap((user: UserDto) => {
          return from(
            bcrypt.compare(pass, user.password) as Promise<boolean>
          ).pipe(
            map((passwordIsCorrect) => ({
              passwordIsCorrect,
              user
            }))
          );
        }),
        switchMap((res) => {
          if (!res.passwordIsCorrect) {
            return throwError(new UnauthorizedException());
          }
          return of(res.user);
        })
      )
      .toPromise();
  }

  /**
   * This method returns a JWT token for a user who has successfully logged in. This, hopefully, will be me ()
   * @param user The email and password object
   */
  public login(user: LoginDto): Promise<{ token: string }> {
    return this.userService
      .findOneAndUpdate<UserDto>(
        { email: user.email },
        { $set: { lastLogIn: new Date() } },
        { upsert: true }
      )
      .pipe(
        switchMap((userResult: UserDto) => {
          if (!userResult) {
            return throwError(new UnauthorizedException());
          }
          // eslint-disable-next-line no-underscore-dangle
          const payload = { email: userResult.email, id: userResult._id };
          // Return an observable of the JWT payload
          return of({
            token: this.jwtService.sign(payload, {
              expiresIn: '1h'
            })
          });
        })
      )
      .toPromise();
  }
}

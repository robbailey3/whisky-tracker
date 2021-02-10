import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly BRUTE_TIMEOUT = 1000 * 60 * 0.5; // 15 minutes

  private readonly MAX_ATTEMPTS = 5;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * This method is primarily used by the Passport 'local' strategy to login a user.
   * @param email The email address of the user
   * @param pass The password of the user. NOTE: This should NEVER be exposed to any logs or anything. Ever.
   */
  public async login(email: string, pass: string): Promise<UserDto> {
    const user = (await this.userService
      .findOne({ email })
      .toPromise()) as UserDto;

    if (!user?.password) {
      throw new UnauthorizedException();
    }

    if (
      user.failedLogins?.filter(
        (failedLogin) => failedLogin > Date.now() - this.BRUTE_TIMEOUT
      ).length > this.MAX_ATTEMPTS
    ) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      this.userService.updateOne(
        { email },
        { $push: { failedLogins: Date.now() } }
      );
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * This method returns a JWT token for a user who has successfully logged in. This, hopefully, will be me ()
   * @param login The email and password object
   */
  public async createJWT(login: LoginDto): Promise<{ token: string }> {
    const user = await this.userService
      .findOneAndUpdate<UserDto>(
        { email: login.email },
        { $set: { lastLogIn: new Date() } },
        { upsert: true }
      )
      .toPromise();

    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      token: this.jwtService.sign(
        {
          email: user.email,
          // eslint-disable-next-line no-underscore-dangle
          id: user._id
        },
        {
          expiresIn: '1h'
        }
      )
    };
  }
}

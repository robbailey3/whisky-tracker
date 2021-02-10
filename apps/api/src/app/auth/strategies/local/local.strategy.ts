import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDto } from '../../../user/dto/user.dto';
import { AuthService } from '../../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  public validate(email: string, password: string): Promise<UserDto> {
    return this.authService.login(email, password);
  }
}

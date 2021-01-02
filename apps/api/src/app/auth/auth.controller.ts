import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  @Get('me')
  getMe() {
    return { me: 'Rob' };
  }
}

import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { WhiskyService } from './whisky.service';

@Controller('whisky')
@ApiTags('Whisky')
export class WhiskyController {
  constructor(private readonly whiskyService: WhiskyService) {}

  @Get('')
  getMany(foo: any) {
    return { foo };
  }
}

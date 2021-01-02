import { WhiskyService } from './whisky.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@Controller('whisky')
@ApiTags('Whisky')
export class WhiskyController {
  constructor(private readonly whiskyService: WhiskyService) {}

  @Get('')
  getMany() {
    return this.whiskyService.getMany({});
  }
}

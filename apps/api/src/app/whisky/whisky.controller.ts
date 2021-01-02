import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller('whisky')
@ApiTags('Whisky')
export class WhiskyController {}

import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller('distillery')
@ApiTags('Distillery')
export class DistilleryController {}

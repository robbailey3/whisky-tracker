import { Module } from '@nestjs/common';
import { DistilleryController } from './distillery.controller';
import { DistilleryService } from './distillery.service';

@Module({
  controllers: [DistilleryController],
  providers: [DistilleryService]
})
export class DistilleryModule {}

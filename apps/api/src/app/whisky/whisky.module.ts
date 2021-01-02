import { Module } from '@nestjs/common';
import { WhiskyController } from './whisky.controller';
import { WhiskyService } from './whisky.service';

@Module({
  controllers: [WhiskyController],
  providers: [WhiskyService]
})
export class WhiskyModule {}

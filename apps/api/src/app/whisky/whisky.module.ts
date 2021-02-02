import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WhiskyController } from './whisky.controller';
import { WhiskyService } from './whisky.service';

@Module({
  controllers: [WhiskyController],
  providers: [WhiskyService],
  imports: [UserModule]
})
export class WhiskyModule {}

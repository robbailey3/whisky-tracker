import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../shared/database/database.service';
import { WhiskyController } from './whisky.controller';
import { WhiskyService } from './whisky.service';

describe('WhiskyController', () => {
  let controller: WhiskyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiskyController],
      providers: [WhiskyService, DatabaseService, ConfigService]
    }).compile();

    controller = module.get<WhiskyController>(WhiskyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

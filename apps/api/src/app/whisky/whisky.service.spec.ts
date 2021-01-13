import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../shared/database/database.service';
import { WhiskyService } from './whisky.service';

describe('WhiskyService', () => {
  let service: WhiskyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiskyService, DatabaseService, ConfigService]
    }).compile();

    service = module.get<WhiskyService>(WhiskyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

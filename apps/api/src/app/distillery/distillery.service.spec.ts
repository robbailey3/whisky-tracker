import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../shared/database/database.service';
import { DistilleryService } from './distillery.service';

jest.mock('../shared/database/database.service');

describe('DistilleryService', () => {
  let service: DistilleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistilleryService, DatabaseService, ConfigService]
    }).compile();

    service = module.get<DistilleryService>(DistilleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

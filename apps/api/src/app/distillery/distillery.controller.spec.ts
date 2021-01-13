import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DistilleryService } from './distillery.service';
import { DistilleryController } from './distillery.controller';
import { DatabaseService } from '../shared/database/database.service';

describe('DistilleryController', () => {
  let controller: DistilleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistilleryController],
      providers: [
        {
          provide: DistilleryService,
          useFactory: () => class MockDistilleryService {}
        }
      ]
    }).compile();

    controller = module.get<DistilleryController>(DistilleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { DistilleryService } from './distillery.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DistilleryController } from './distillery.controller';

class MockDistilleryService {
  public getMany: () => void;
  constructor() {
    this.getMany = jest.fn();
  }
}

describe('DistilleryController', () => {
  let controller: DistilleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistilleryController],
      providers: [
        {
          provide: DistilleryService,
          useClass: MockDistilleryService,
        },
      ],
    }).compile();

    controller = module.get<DistilleryController>(DistilleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DistilleryService->GetMany', () => {
    controller.getMany();
    expect(MockDistilleryService.prototype.getMany).toHaveBeenCalled();
  });
});

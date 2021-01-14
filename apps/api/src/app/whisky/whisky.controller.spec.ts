import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { WhiskyController } from './whisky.controller';
import { WhiskyService } from './whisky.service';

jest.mock('./whisky.service');

describe('WhiskyController', () => {
  let controller: WhiskyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiskyController],
      providers: [WhiskyService]
    }).compile();

    controller = module.get<WhiskyController>(WhiskyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: getMany', () => {
    it('should have a getMany method', () => {
      expect(controller.getMany).toBeDefined();
    });
    it('should call whiskyService->getMany when called', () => {
      const spy = jest.spyOn(WhiskyService.prototype, 'getMany');
      controller.getMany({ filter: {}, sort: {}, skip: 0, limit: 100 });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: getOne', () => {
    it('should have a getMany method', () => {
      expect(controller.getOne).toBeDefined();
    });
    it('should call whiskyService->getMany when called', () => {
      const spy = jest.spyOn(WhiskyService.prototype, 'getOne');
      controller.getOne(new ObjectID().toHexString());
      expect(spy).toHaveBeenCalled();
    });
  });
});

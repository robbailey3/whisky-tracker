import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { WhiskyController } from './whisky.controller';
import { WhiskyService } from './whisky.service';

jest.mock('./whisky.service');

describe('WhiskyController', () => {
  let controller: WhiskyController;
  let whiskyService: WhiskyService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiskyController],
      providers: [WhiskyService]
    }).compile();

    controller = module.get<WhiskyController>(WhiskyController);
    whiskyService = module.get<WhiskyService>(WhiskyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: find', () => {
    it('should have a find method', () => {
      expect(controller.find).toBeDefined();
    });
    it('should call whiskyService->find when called', () => {
      const spy = jest.spyOn(whiskyService, 'find');
      controller.find({ filter: {}, sort: {}, skip: 0, limit: 100 });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: findOne', () => {
    it('should have a findOne method', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should call whiskyService->findOne when called', () => {
      const spy = jest.spyOn(whiskyService, 'findOne');
      controller.findOne(new ObjectID().toHexString());
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: insertOne', () => {
    const spy = jest.spyOn(WhiskyService.prototype, 'insertOne');
    it('should be defined', () => {
      expect(controller.insertOne).toBeDefined();
    });

    it('should call whiskyService->insertOne', () => {
      controller.insertOne({});
      expect(spy).toHaveBeenCalled();
    });

    it('should pass the body parameter', () => {
      controller.insertOne({ name: 'Name' });
      expect(spy).toHaveBeenCalledWith({ name: 'Name' });
    });
  });
});

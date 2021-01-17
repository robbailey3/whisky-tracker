import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';

import { DistilleryService } from './distillery.service';
import { DistilleryController } from './distillery.controller';
import { BadRequestException } from '@nestjs/common';

jest.mock('./distillery.service');

describe('DistilleryController', () => {
  let controller: DistilleryController;
  let service: DistilleryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistilleryController],
      providers: [DistilleryService]
    }).compile();

    controller = module.get<DistilleryController>(DistilleryController);
    service = module.get<DistilleryService>(DistilleryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: find', () => {
    it('should call distilleryService->find', () => {
      const spy = jest.spyOn(service, 'find');
      controller.find({ limit: 0, skip: 0, sort: {}, filter: {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: findOne', () => {
    let spy;
    let validID;
    const invalidID = 'invalid_id';
    beforeEach(() => {
      spy = jest.spyOn(service, 'findOne');
      validID = new ObjectID().toHexString();
    });
    it('should throw an error when an invalid ID is provided', () => {
      expect(() => controller.findOne(invalidID)).toThrow(BadRequestException);
    });
    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.findOne(validID)).not.toThrow(
        BadRequestException
      );
    });
    it('should call distilleryService->findOne', () => {
      controller.findOne(validID);
      expect(spy).toHaveBeenCalled();
    });

    it('should pass the ID parameter to the service', () => {
      controller.findOne(validID);
      expect(spy).toHaveBeenCalledWith({
        _id: ObjectID.createFromHexString(validID)
      });
    });
  });
});

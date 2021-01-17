import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DistilleryService } from './distillery.service';
import { DistilleryController } from './distillery.controller';
import { DistilleryDto } from './dto/distillery.dto';

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

  describe('[METHOD]: insertOne', () => {
    let spy;

    const newDistillery: DistilleryDto = plainToClass(DistilleryDto, {
      _id: '',
      name: ''
    });

    beforeEach(() => {
      spy = jest.spyOn(service, 'insertOne');
    });

    it('should be defined', () => {
      expect(controller.insertOne).toBeDefined();
    });

    it('should call distilleryService->insertOne', () => {
      controller.insertOne(newDistillery);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: updateOne', () => {
    let spy;
    let validID;
    const invalidID = 'invalid_id';

    const updatedDistillery: DistilleryDto = plainToClass(DistilleryDto, {
      _id: '',
      name: ''
    });

    beforeEach(() => {
      spy = jest.spyOn(service, 'updateOne');
      validID = new ObjectID().toHexString();
    });

    it('should be defined', () => {
      expect(controller.updateOne).toBeDefined();
    });

    it('should throw an error when an invalid ID is provided', () => {
      expect(() => controller.updateOne(invalidID, updatedDistillery)).toThrow(
        BadRequestException
      );
    });
    it('should not throw an error when a valid ID is provided', () => {
      expect(() =>
        controller.updateOne(validID, updatedDistillery)
      ).not.toThrow(BadRequestException);
    });

    it('should call distilleryService->updateOne', () => {
      controller.updateOne(validID, updatedDistillery);
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('[METHOD]: deleteOne', () => {
    let spy;
    let validID;
    const invalidID = 'invalid_id';

    beforeEach(() => {
      spy = jest.spyOn(service, 'deleteOne');
      validID = new ObjectID().toHexString();
    });

    it('should be defined', () => {
      expect(controller.deleteOne).toBeDefined();
    });

    it('should throw an error when an invalid ID is provided', () => {
      expect(() => controller.deleteOne(invalidID)).toThrow(
        BadRequestException
      );
    });
    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.deleteOne(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call distilleryService->deleteOne', () => {
      controller.deleteOne(validID);
      expect(spy).toHaveBeenCalled();
    });
  });
});

import { BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { WhiskyController } from './whisky.controller';
import { WhiskyService } from './whisky.service';
import { WhiskyDto } from './dto/whisky.dto';

jest.mock('./whisky.service');

describe('WhiskyController', () => {
  let controller: WhiskyController;
  let service: WhiskyService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiskyController],
      providers: [WhiskyService]
    }).compile();

    controller = module.get<WhiskyController>(WhiskyController);
    service = module.get<WhiskyService>(WhiskyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: find', () => {
    it('should have a find method', () => {
      expect(controller.find).toBeDefined();
    });
    it('should call whiskyService->find when called', () => {
      const spy = jest.spyOn(service, 'find');
      controller.find({ filter: {}, sort: {}, skip: 0, limit: 100 });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: findOne', () => {
    let validID;
    let spy;
    const invalidID = 'invalid_id';
    beforeEach(() => {
      validID = new ObjectID().toHexString();
      spy = jest.spyOn(service, 'findOne');
    });
    it('should have a findOne method', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.findOne(invalidID)).toThrow(BadRequestException);
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.findOne(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call whiskyService->findOne when called', () => {
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

  describe('[METHOD]: updateOne', () => {
    let spy;
    let validID;
    const invalidID = 'invalid_id';

    const updatedDistillery: WhiskyDto = plainToClass(WhiskyDto, {
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

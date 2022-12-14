import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtiesController } from './specialties.controller';

describe('SpecialtiesController', () => {
  let controller: SpecialtiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialtiesController],
    }).compile();

    controller = module.get<SpecialtiesController>(SpecialtiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

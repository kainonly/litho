import { Test, TestingModule } from '@nestjs/testing';
import { DslService } from '@weplanx/api/dsl/dsl.service';

import { DslController } from './dsl.controller';

describe('EngineController', () => {
  let controller: DslController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DslController],
      providers: [DslService],
    }).compile();

    controller = module.get<DslController>(DslController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

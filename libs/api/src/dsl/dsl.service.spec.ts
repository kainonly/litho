import { Test, TestingModule } from '@nestjs/testing';

import { DslService } from './dsl.service';

describe('DslService', () => {
  let service: DslService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DslService],
    }).compile();

    service = module.get<DslService>(DslService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

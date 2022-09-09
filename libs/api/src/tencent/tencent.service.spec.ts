import { Test, TestingModule } from '@nestjs/testing';

import { TencentService } from './tencent.service';

describe('TencentService', () => {
  let service: TencentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TencentService],
    }).compile();

    service = module.get<TencentService>(TencentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

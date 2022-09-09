import { Test, TestingModule } from '@nestjs/testing';

import { FeishuService } from './feishu.service';

describe('FeishuService', () => {
  let service: FeishuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeishuService],
    }).compile();

    service = module.get<FeishuService>(FeishuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

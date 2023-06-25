import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { REDIS } from '@weplanx/utils/providers';

import { LockerService } from './locker.service';

describe('UtilsService', () => {
  let service: LockerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true
        })
      ],
      providers: [LockerService, REDIS]
    }).compile();

    service = module.get<LockerService>(LockerService);
  });

  it('update', async () => {
    await service.update('kain');
  });
});

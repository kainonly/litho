import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '@weplanx/api';
import { nanoid } from 'nanoid';

import configuration from '../../../../config/configuration';
import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        ApiModule,
      ],
      providers: [SessionsService],
    }).compile();
    service = module.get<SessionsService>(SessionsService);
  });

  const keys: string[] = [];

  it('新增会话', async () => {
    for (let i = 0; i < 1000; i++) {
      keys.push(i.toString());
      await service.set(i.toString(), nanoid());
    }
  });

  it('获取所有会话', async () => {
    const uids = await service.lists();
    expect(uids.length).toEqual(1000);
    expect(uids.sort()).toEqual(keys.sort());
  });

  it('清空所有会话', async () => {
    await service.clear();
  });
});

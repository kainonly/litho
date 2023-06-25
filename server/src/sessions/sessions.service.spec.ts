import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { REDIS } from '@weplanx/utils/providers';

import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true
        })
      ],
      providers: [REDIS, SessionsService]
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('setSession', () => {
    service.setSession('1', '123456');
  });
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaService } from '@weplanx/utils/captcha.service';
import { REDIS } from '@weplanx/utils/providers';

describe('CaptchaService', () => {
  let service: CaptchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true
        })
      ],
      providers: [CaptchaService, REDIS]
    }).compile();

    service = module.get<CaptchaService>(CaptchaService);
  });
});

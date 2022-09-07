import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '@weplanx/api';
import randomstring from 'randomstring';

import configuration from '../../../../config/configuration';
import { CaptchaService } from './captcha.service';

describe('CaptchaService', () => {
  let service: CaptchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        ApiModule,
      ],
      providers: [CaptchaService],
    }).compile();

    service = module.get<CaptchaService>(CaptchaService);
  });

  let code: string;

  it('创建验证码', async () => {
    code = randomstring.generate(8);
    await service.create('1', code, 3600);
  });

  it('存在验证码', async () => {
    const exists1 = await service.exists('1');
    expect(exists1).toBeTruthy();
    const exists2 = await service.exists('2');
    expect(exists2).toBeFalsy();
  });

  it('校验验证码', async () => {
    const otherCode = randomstring.generate(8);
    const result1 = await service.verify('1', otherCode);
    expect(result1).toBeFalsy();
    const result2 = await service.verify('1', code);
    expect(result2).toBeTruthy();
  });

  it('移除验证码', async () => {
    await service.delete('1');
    const exists = await service.exists('1');
    expect(exists).toBeFalsy();
  });
});

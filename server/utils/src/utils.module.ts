import { Module } from '@nestjs/common';
import { CaptchaService } from '@weplanx/utils/captcha.service';
import { LockerService } from '@weplanx/utils/locker.service';
import { REDIS } from '@weplanx/utils/providers';

@Module({
  providers: [REDIS, LockerService, CaptchaService],
  exports: [LockerService, CaptchaService]
})
export class UtilsModule {}

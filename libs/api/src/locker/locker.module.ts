import { Module } from '@nestjs/common';

import { LockerService } from './locker.service';

@Module({
  providers: [LockerService],
  exports: [LockerService],
})
export class LockerModule {}

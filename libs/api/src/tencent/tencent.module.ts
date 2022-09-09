import { Module } from '@nestjs/common';

import { TencentService } from './tencent.service';

@Module({
  providers: [TencentService],
})
export class TencentModule {}

import { Module } from '@nestjs/common';

import { FeishuService } from './feishu.service';

@Module({
  providers: [FeishuService],
})
export class FeishuModule {}

import { Module } from '@nestjs/common';

import { DslController } from './dsl.controller';
import { DslService } from './dsl.service';

@Module({
  controllers: [DslController],
  providers: [DslService],
})
export class DslModule {}

import { Global, Module } from '@nestjs/common';

import { ValuesController } from './values.controller';
import { ValuesService } from './values.service';

@Global()
@Module({
  providers: [ValuesService],
  exports: [ValuesService],
  controllers: [ValuesController],
})
export class ValuesModule {}

import { Module } from '@nestjs/common';
import { REDIS } from '@weplanx/utils/providers';

import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  providers: [REDIS, SessionsService],
  controllers: [SessionsController],
  exports: [SessionsService]
})
export class SessionsModule {}

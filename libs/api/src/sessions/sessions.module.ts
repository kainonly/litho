import { Module } from '@nestjs/common';

import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsService],
  exports: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}

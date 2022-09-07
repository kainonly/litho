import { Controller, Delete, Get, Param } from '@nestjs/common';

import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessions: SessionsService) {}

  @Get()
  async lists(): Promise<any> {
    return this.sessions.lists();
  }

  @Delete(':uid')
  async remove(@Param('uid') uid: string): Promise<any> {
    await this.sessions.remove(uid);
  }

  @Delete()
  async clear(): Promise<void> {
    await this.sessions.clear();
  }
}

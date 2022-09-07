import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Query } from '@nestjs/common';

import { Values } from '@weplanx/common';

import { Active } from '../api.decorator';
import { IActiveUser } from '../types';
import { ValuesService } from './values.service';

@Controller('values')
export class ValuesController {
  constructor(private values: ValuesService) {}

  @Get()
  async get(@Query('keys', new ParseArrayPipe({ optional: true })) keys: Array<keyof Values>): Promise<any> {
    return this.values.get(keys);
  }

  @Patch()
  async set(@Active() { data }: IActiveUser, @Body() body: Partial<Values>): Promise<void> {
    await this.values.set(data._id, body);
  }

  @Delete(':key')
  async remove(@Active() { data }: IActiveUser, @Param('key') key: keyof Values): Promise<void> {
    await this.values.remove(data._id, key);
  }
}

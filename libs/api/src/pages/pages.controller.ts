import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';

import { ObjectId } from 'mongodb';

import { CreateIndexDto } from './dto/create-index.dto';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private pages: PagesService) {}

  @Get()
  async navs(): Promise<any> {
    return this.pages.navs();
  }

  @Get(':id')
  async dynamic(@Param('id') id: string): Promise<any> {
    return this.pages.findOneById(new ObjectId(id));
  }

  @Get(':id/indexes')
  async listIndexes(@Param('id') id: string): Promise<any> {
    const page = await this.pages.findOneById(new ObjectId(id));
    return this.pages.listIndexes(page.schema.key);
  }

  @Put(':id/indexes/:index')
  async createIndex(
    @Param('id') id: string,
    @Param('index') index: string,
    @Body() body: CreateIndexDto
  ): Promise<void> {
    const page = await this.pages.findOneById(new ObjectId(id));
    await this.pages.createIndex(page.schema.key, index, body.keys, body.unique);
  }

  @Delete(':id/indexes/:index')
  async dropIndex(@Param('id') id: string, @Param('index') index: string): Promise<void> {
    const page = await this.pages.findOneById(new ObjectId(id));
    await this.pages.dropIndex(page.schema.key, index);
  }
}

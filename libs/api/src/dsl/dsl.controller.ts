import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Head,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { FastifyReply } from 'fastify';
import { FindOptions, ObjectId } from 'mongodb';

import { DslService } from './dsl.service';
import { ParamsDto } from './dto/params.dto';
import { QueryDto } from './dto/query.dto';

@Controller('dsl/:model')
export class DslController {
  private BodyEmptyException = new BadRequestException('Request body or object cannot be empty');

  constructor(private dsl: DslService) {}

  @Post()
  async create(@Param() params: ParamsDto, @Query() query: QueryDto, @Body() body: Record<string, any>): Promise<any> {
    if (!body || Object.keys(body).length === 0) {
      throw this.BodyEmptyException;
    }
    const doc = await this.dsl.format(body, query.xdoc);
    const result = await this.dsl.insertOne(params.model, doc);
    this.dsl.publish(params.model, { event: 'create', body, result });
    return result;
  }

  @Post('bulk-create')
  async bulkCreate(
    @Param() params: ParamsDto,
    @Query() query: QueryDto,
    @Body() body: Array<Record<string, any>>
  ): Promise<any> {
    if (!body || body.length === 0) {
      throw this.BodyEmptyException;
    }
    if (body.some((v) => Object.keys(v).length === 0)) {
      throw new BadRequestException('Array has empty objects');
    }
    const docs = [];
    for (const x of body) {
      docs.push(await this.dsl.format(x, query.xdoc));
    }
    const result = await this.dsl.insertMany(params.model, docs);
    this.dsl.publish(params.model, { event: 'bulk-create', body, result });
    return result;
  }

  @Get('_size')
  @HttpCode(204)
  async size(
    @Param() params: ParamsDto,
    @Query() query: QueryDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<void> {
    const filter = query.filter ? await this.dsl.format(query.filter, query.xfilter) : {};
    const count = await this.dsl.count(params.model, filter);
    res.header('wpx-total', count);
  }

  @Head('_exists')
  @HttpCode(204)
  async exists(
    @Param() params: ParamsDto,
    @Query() query: QueryDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<void> {
    const filter = await this.dsl.format(query.filter, query.xfilter);
    const exists = await this.dsl.exists(params.model, filter);
    res.header('wpx-exists', exists);
  }

  @Get(':id')
  async findOneById(@Param() params: ParamsDto, @Query() query: QueryDto): Promise<any> {
    return this.dsl.findOne(
      params.model,
      { _id: new ObjectId(params.id) },
      {
        projection: query.keys,
      }
    );
  }

  @Get('_one')
  async findOne(@Param() params: ParamsDto, @Query() query: QueryDto): Promise<any> {
    const filter = await this.dsl.format(query.filter, query.xfilter);
    return this.dsl.findOne(params.model, filter, {
      projection: query.keys,
    });
  }

  @Get()
  async find(@Param() params: ParamsDto, @Query() query: QueryDto): Promise<any> {
    const filter = await this.dsl.format(query.filter, query.xfilter);
    const options: FindOptions = {
      sort: query.sort ?? { _id: -1 },
      limit: query.limit ?? 20,
      skip: query.skip ?? 0,
      projection: query.keys,
    };
    if (Object.keys(options.sort).length > 1) {
      options.allowDiskUse = true;
    }
    return this.dsl.find(params.model, filter, options);
  }

  @Get('_pages')
  async findPages(
    @Param() params: ParamsDto,
    @Query() query: QueryDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<any> {
    const filter = await this.dsl.format(query.filter, query.xfilter);
    const count = await this.dsl.count(params.model, filter);
    res.header('wpx-total', count);
    const options: FindOptions = {
      sort: query.sort ?? { _id: -1 },
      limit: query.pagesize ?? 20,
      projection: query.keys,
    };
    options['skip'] = ((query.page ?? 1) - 1) * options['limit'];
    if (Object.keys(options.sort).length > 1) {
      options.allowDiskUse = true;
    }
    return this.dsl.find(params.model, filter, options);
  }

  @Patch(':id')
  async updateOneById(
    @Param() params: ParamsDto,
    @Query() query: QueryDto,
    @Body() body: Record<string, any>
  ): Promise<any> {
    if (!body || Object.keys(body).length === 0) {
      throw this.BodyEmptyException;
    }
    const update = await this.dsl.format(body, query.xdoc);
    const result = await this.dsl.updateOne(params.model, { _id: new ObjectId(params.id) }, update);
    this.dsl.publish(params.model, {
      event: 'update',
      id: params.id,
      body,
      result,
    });
    return result;
  }

  @Patch()
  async update(@Param() params: ParamsDto, @Query() query: QueryDto, @Body() body: Record<string, any>): Promise<any> {
    if (!body || Object.keys(body).length === 0) {
      throw this.BodyEmptyException;
    }
    const filter = await this.dsl.format(query.filter, query.xfilter);
    const update = await this.dsl.format(body, query.xdoc);
    const result = await this.dsl.updateMany(params.model, filter, update);
    this.dsl.publish(params.model, {
      event: 'update',
      query,
      body,
      result,
    });
    return result;
  }

  @Put(':id')
  async replace(@Param() params: ParamsDto, @Query() query: QueryDto, @Body() body: Record<string, any>): Promise<any> {
    if (!body || Object.keys(body).length === 0) {
      throw this.BodyEmptyException;
    }
    const doc = await this.dsl.format(body, query.xdoc);
    const result = await this.dsl.replace(params.model, params.id, doc);
    this.dsl.publish(params.model, {
      event: 'replace',
      id: params.id,
      body,
      result,
    });
    return result;
  }

  @Delete(':id')
  async delete(@Param() params: ParamsDto): Promise<any> {
    const result = await this.dsl.delete(params.model, params.id);
    this.dsl.publish(params.model, {
      event: 'delete',
      id: params.id,
      result,
    });
    return result;
  }

  @Post('bulk-delete')
  @HttpCode(200)
  async bulkDelete(
    @Param() params: ParamsDto,
    @Query() query: QueryDto,
    @Body() body: Record<string, any>
  ): Promise<any> {
    if (!body || Object.keys(body).length === 0) {
      throw this.BodyEmptyException;
    }
    const filter = await this.dsl.format(body, query.xfilter);
    const result = await this.dsl.deleteMany(params.model, filter);
    this.dsl.publish(params.model, {
      event: 'bulk-delete',
      query,
      result,
    });
    return result;
  }

  @Post('sort')
  @HttpCode(200)
  sort(@Param() params: ParamsDto, @Body() body: string[]): any {
    if (!body || body.length === 0) {
      throw this.BodyEmptyException;
    }
    if (!body.every((v) => isMongoId(v))) {
      throw new BadRequestException('Array must contain ObjectId');
    }
    return this.dsl.sort(params.model, body);
  }
}

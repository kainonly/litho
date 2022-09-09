import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Values } from '@weplanx/common';
import * as argon2 from 'argon2';
import { AnyBulkWriteOperation, Db, Filter, FindOptions, InsertManyResult, InsertOneResult, ObjectId } from 'mongodb';
import { Codec, JetStreamClient, JetStreamManager, JSONCodec, NatsConnection } from 'nats';

import { DATABASE, JS, JSM, NATS } from '../api.providers';
import { IApp } from '../types';
import { ValuesService } from '../values/values.service';
import { PublishDto } from './dto/publish.dto';

export class DslService {
  /**
   * 应用配置
   * @private
   */
  private app: IApp;

  /**
   * 动态配置
   * @private
   */
  private store: Values;

  /**
   * 编码
   * @private
   */
  private sc: Codec<Partial<PublishDto>> = JSONCodec<Partial<PublishDto>>();

  constructor(
    @Inject(DATABASE) private db: Db,
    @Inject(NATS) private nc: NatsConnection,
    @Inject(JS) private js: JetStreamClient,
    @Inject(JSM) private jsm: JetStreamManager,
    private config: ConfigService,
    private values: ValuesService
  ) {
    this.app = this.config.get<IApp>('app');
    this.store = this.values.store;
  }

  /**
   * 格式转换
   * @param data 数据
   * @param rules 规则
   */
  async format(data: Record<string, any>, rules: string[]): Promise<Record<string, any>> {
    if (!rules) {
      return data;
    }
    for (const rule of rules) {
      const [path, format] = rule.split(':');
      const keys = path.split('.');
      const key = keys.splice(keys.length - 1, 1)[0];
      const cursor = keys.reduce((v, k) => v[k], data);
      const value = cursor[key];
      switch (format) {
        case 'oid':
          cursor[key] = new ObjectId(value);
          break;
        case 'oids':
          cursor[key] = (value as string[]).map(v => new ObjectId(v));
          break;
        case 'date':
          cursor[key] = new Date(value);
          break;
        case 'password':
          cursor[key] = await argon2.hash(value, { type: argon2.argon2id });
          break;
      }
    }
    return data;
  }

  /**
   * 创建文档
   * @param model 模型命名
   * @param doc 文档
   */
  insertOne(model: string, doc: Record<string, any>): Promise<InsertOneResult> {
    doc.create_time = new Date();
    doc.update_time = new Date();
    return this.db.collection(model).insertOne(doc);
  }

  /**
   * 批量创建文档
   * @param model 模型命名
   * @param docs 多文档
   */
  insertMany(model: string, docs: Array<Record<string, any>>): Promise<InsertManyResult> {
    return this.db.collection(model).insertMany(
      docs.map(doc => {
        doc.create_time = new Date();
        doc.update_time = new Date();
        return doc;
      })
    );
  }

  /**
   * 文档总数
   * @param model 模型命名
   * @param filter 筛选
   */
  count(model: string, filter?: Filter<any>): Promise<number> {
    if (!filter) {
      return this.db.collection(model).estimatedDocumentCount();
    }
    return this.db.collection(model).countDocuments(filter);
  }

  /**
   * 文档存在状态
   * @param model 模型命名
   * @param filter 筛选
   */
  async exists(model: string, filter: Filter<any>): Promise<boolean> {
    const count = await this.db.collection(model).countDocuments(filter);
    return count !== 0;
  }

  /**
   * 筛选单个文档
   * @param model 模型命名
   * @param filter 筛选
   * @param options 配置
   */
  findOne(model: string, filter: Filter<any>, options?: FindOptions): Promise<Record<string, any>> {
    return this.db.collection(model).findOne(filter, options);
  }

  /**
   * 筛选多个文档
   * @param model 模型命名
   * @param filter 筛选
   * @param options 配置
   */
  find(model: string, filter: Filter<any>, options: FindOptions): Promise<any[]> {
    if (this.store[`${model}_projection`]) {
      options.projection = JSON.parse(this.store[`${model}_projection`]);
    }
    return this.db.collection(model).find(filter, options).toArray();
  }

  /**
   * 筛选单个文档局部更新
   * @param model 模型命名
   * @param filter 筛选
   * @param update 更新内容
   */
  updateOne(model: string, filter: Filter<any>, update: Record<string, any>): Promise<any> {
    if (!update.$set) {
      update.$set = {};
    }
    update.$set.update_time = new Date();
    return this.db.collection(model).updateOne(filter, update);
  }

  /**
   * 筛选多个文档局部更新
   * @param model 模型命名
   * @param filter 筛选
   * @param update 更新内容
   */
  updateMany(model: string, filter: Filter<any>, update: Record<string, any>): Promise<any> {
    if (!update.$set) {
      update.$set = {};
    }
    update.$set.update_time = new Date();
    return this.db.collection(model).updateMany(filter, update);
  }

  /**
   * 替换文档
   * @param model 模型命名
   * @param id 文档 ID
   * @param doc 文档
   */
  replace(model: string, id: string, doc: Record<string, any>): Promise<any> {
    doc.create_time = new Date();
    doc.update_time = new Date();
    return this.db.collection(model).replaceOne({ _id: new ObjectId(id) }, doc);
  }

  /**
   * 删除文档
   * @param model 模型命名
   * @param id 文档 ID
   */
  delete(model: string, id: string): Promise<any> {
    return this.db.collection(model).deleteOne({ _id: new ObjectId(id) });
  }

  /**
   * 批量删除文档
   * @param model 模型命名
   * @param filter 筛选
   */
  deleteMany(model: string, filter: Filter<any>): Promise<any> {
    return this.db.collection(model).deleteMany(filter);
  }

  /**
   * 通用排序
   * @param model 模型命名
   * @param ids 文档 ID 数组，顺序即数组索引
   */
  sort(model: string, ids: string[]): Promise<any> {
    const operations: AnyBulkWriteOperation[] = ids.map<AnyBulkWriteOperation>((value, index) => ({
      updateOne: {
        filter: { _id: new ObjectId(value) },
        update: {
          $set: { sort: index }
        }
      }
    }));
    return this.db.collection(model).bulkWrite(operations);
  }

  /**
   * 发布消息事务补偿
   * @param model 模型命名
   * @param event 事件内容
   */
  async publish(model: string, event: Partial<PublishDto>): Promise<void> {
    if (this.store[`${model}_event`]) {
      const namespace = this.config.get('namespace');
      const sub = `${namespace}.events.${model}`;
      await this.jsm.streams.add({
        name: `${namespace}:events:${model}`,
        subjects: [sub]
      });
      await this.js.publish(sub, this.sc.encode(event));
    }
  }
}

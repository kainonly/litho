import { Inject, Injectable } from '@nestjs/common';

import { Page } from '@weplanx/common';
import { Db, Document, IndexSpecification, ObjectId, WithId } from 'mongodb';

import { DATABASE } from '../api.providers';

@Injectable()
export class PagesService {
  protected collection = this.db.collection<Page>('pages');

  constructor(@Inject(DATABASE) private db: Db) {}

  /**
   * 获取导航数据
   * TODO: 优化为缓存
   */
  navs(): Promise<Page[]> {
    return this.collection
      .find(
        { status: true },
        {
          projection: { parent: 1, name: 1, icon: 1, kind: 1, sort: 1 }
        }
      )
      .toArray();
  }

  findOneById(id: ObjectId): Promise<WithId<Page>> {
    return this.collection.findOne({ _id: id });
  }

  /**
   * 获取索引列表
   * @param model 集合命名
   */
  async listIndexes(model: string): Promise<Document[]> {
    return this.db.collection(model).listIndexes().toArray();
  }

  /**
   * 创建索引
   * @param model 集合命名
   * @param name 索引命名
   * @param keys 字段
   * @param unique 是否唯一
   */
  async createIndex(model: string, name: string, keys: IndexSpecification, unique: boolean): Promise<void> {
    await this.db.collection(model).createIndex(keys, { name, unique });
  }

  /**
   * 移除索引
   * @param model 集合命名
   * @param name 索引命名
   */
  async dropIndex(model: string, name: string): Promise<void> {
    await this.db.collection(model).dropIndex(name);
  }
}

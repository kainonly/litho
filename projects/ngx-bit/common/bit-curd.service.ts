import { Injectable } from '@angular/core';
import { CurdOption, QueryMode, SearchOption } from './types';
import { BitHttpService } from './bit-http.service';
import { BitConfig } from './bit-config';

@Injectable({ providedIn: 'root' })
export class BitCurdService {
  /**
   * 查询模式
   * Query mode
   */
  readonly mode: QueryMode;
  /**
   * 通用接口定义
   * General interface definition
   */
  protected curd: CurdOption;

  constructor(
    bitConfig: BitConfig,
    protected http: BitHttpService
  ) {
    this.mode = bitConfig.query;
    this.curd = bitConfig.curd;
    // this.curd.get = bitConfig.curd.get || '/get';
    // this.curd.originLists = bitConfig.curd.originLists ?? '/originLists';
    // this.curd.lists = bitConfig.curd.lists ?? '/lists';
    // this.curd.add = bitConfig?.curd?.add ?? '/add';
    // this.curd.edit = bitConfig?.curd.edit ?? '/edit';
    // this.curd.status = bitConfig?.curd.status ?? '/status';
    // this.curd.delete = bitConfig?.curd.delete ?? '/delete';
  }

  /**
   * 获取查询语句
   * Get query statement
   */
  getQuerySchema(options: SearchOption[]): any[] {
    switch (this.mode) {
      case 'sql-orm':
        return this.common(options);
      case 'mongo':
        break;
      case 'cloud':
        break;
      default:
        console.warn('Please set the query driver.');
    }
  }

  /**
   * mode: sql-orm
   * php: Laravel ORM(Laravel,Lumen,Hyperf), ThinkPHP ORM
   *  - https://github.com/kainonly/think-bit
   *  - https://github.com/kainonly/hyperf-curd
   * golang: https://github.com/kainonly/gin-curd
   */
  protected common(options: SearchOption[]): any[] {
    const schema = [];
    for (const search of options) {
      if (
        search.value !== null &&
        typeof search.value === 'object' &&
        Object.keys(search.value).length === 0
      ) {
        continue;
      }
      if (typeof search.value === 'string') {
        search.value = search.value.trim();
      }
      const exclude = search.exclude ? search.exclude : ['', 0, null];
      if (!exclude.includes(search.value)) {
        let value = search.value;
        if (search.op === 'like') {
          value = `%${value}%`;
        }
        if (search.format !== undefined && search.format === 'unixtime') {
          value = Array.isArray(value) ?
            value.map(v => Math.floor(v.getTime() / 1000)) : Math.floor(value.getTime() / 1000);
        }
        schema.push([search.field, search.op, value]);
      }
    }
    return schema;
  }
}

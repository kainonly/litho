import { Injectable } from '@angular/core';

import { BitConfig } from './bit-config';
import { BitHttpService } from './bit-http.service';
import { CurdOption, QueryMode, SearchOption } from './types';

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

  constructor(bitConfig: BitConfig, protected http: BitHttpService) {
    this.mode = bitConfig.query;
    this.curd = bitConfig.curd;
  }

  /**
   * 获取查询语句
   * Get query statement
   */
  getQuerySchema(options: SearchOption[]): unknown[] {
    switch (this.mode) {
      case 'sql-orm':
        return this.common(options);
      default:
        return this.common(options);
    }
  }

  /**
   * mode: sql-orm
   * php: Laravel ORM(Laravel,Lumen,Hyperf), ThinkPHP ORM
   *  - https://github.com/kainonly/think-bit
   *  - https://github.com/kainonly/hyperf-curd
   * golang: https://github.com/kainonly/gin-curd
   */
  protected common(options: SearchOption[]): unknown[] {
    const schema = [];
    for (const search of options) {
      if (search.value !== null && typeof search.value === 'object' && Object.keys(search.value).length === 0) {
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
          value = Array.isArray(value)
            ? value.map(v => Math.trunc(v.getTime() / 1000))
            : Math.trunc(value.getTime() / 1000);
        }
        schema.push([search.field, search.op, value]);
      }
    }
    return schema;
  }
}

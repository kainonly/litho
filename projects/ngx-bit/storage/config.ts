import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  /**
   * CDN 加载地址，默认 https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js
   * Load script, default https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js
   */
  url?: string;

  /**
   * 数据库的名称
   * The name of the database
   */
  name?: string;

  /**
   * 数据仓库的名称
   * The name of the datastore
   */
  storeName?: string;

  /**
   * 数据库的版本
   * The schema version of your database
   */
  version?: string;
}

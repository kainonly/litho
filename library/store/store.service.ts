/// <reference types="localforage" />

declare let localforage: LocalForage;

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable()
export class WpxStoreService {
  constructor() {}

  /**
   * 将数据保存到离线仓库
   * @param key
   * @param value
   */
  set<T>(key: string, value: T): Observable<T> {
    return from(localforage.setItem<T>(key, value));
  }

  /**
   * 从仓库中获取 key 对应的值并将结果提供给回调函数
   * @param key
   */
  get<T>(key: string): Observable<T | null> {
    return from(localforage.getItem<T>(key));
  }

  /**
   * 从离线仓库中删除 key 对应的值
   * @param key
   */
  remove(key: string): Observable<void> {
    return from(localforage.removeItem(key));
  }

  /**
   * 从数据库中删除所有的 key，重置数据库
   */
  clear(): Observable<void> {
    return from(localforage.clear());
  }
}

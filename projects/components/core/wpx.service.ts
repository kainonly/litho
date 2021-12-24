import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { StorageMap } from '@ngx-pwa/local-storage';

import { Api } from './common/api';
import { Collection } from './common/collection';
import { APIResponse, CollectionValue, Field, LayoutOption, Page, UploadOption } from './types';

@Injectable({ providedIn: 'root' })
export class WpxService {
  /**
   * 接口基础路径
   */
  baseUrl = '/api';
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传地址
   */
  upload?: string | UploadOption;
  /**
   * 页面数据
   */
  readonly pages: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>([]);
  /**
   * 路径索引
   */
  readonly paths: BehaviorSubject<Map<string, Page>> = new BehaviorSubject<Map<string, Page>>(new Map<string, Page>());
  /**
   * 路径片段
   */
  fragments: string[] = [];
  /**
   * 布局设置
   */
  layout: Partial<LayoutOption> = {};

  constructor(
    @Optional() private router: Router,
    @Optional() private http: HttpClient,
    @Optional() private storage: StorageMap
  ) {}

  /**
   * 获取页面数据
   */
  fetchPages(v: APIResponse<Page[]>): Observable<any> {
    const pages: Page[] = [];
    const values: Map<string, Page> = new Map<string, Page>();
    const paths: Map<string, Page> = new Map<string, Page>();
    for (const x of v.data!) {
      values.set(x._id, x);
      x.children = [];
      if (x.parent === 'root') {
        x.fragments = [x.fragment];
        pages.push(x);
      } else {
        if (values.has(x.parent)) {
          x.fragments = [...values.get(x.parent)!.fragments, x.fragment];
          values.get(x.parent)!.children.push(x);
        }
      }
      x.level = x.fragments.length;
      paths.set(x.fragments.join('/'), { ...x });
    }
    this.pages.next(pages);
    this.paths.next(paths);
    return this.pages.asObservable();
  }

  setBaseUrl(value: string): void {
    this.baseUrl = value;
  }

  setAssets(value: string): void {
    this.assets = value;
  }

  setUpload(value: string | UploadOption): void {
    this.upload = value;
  }

  /**
   * 创建数据集合
   */
  collection<T extends CollectionValue>(key: string, fields: Field[]): Collection<T> {
    return new Collection<T>({
      key: `collection:${key}`,
      storage: this.storage,
      fields
    });
  }
}

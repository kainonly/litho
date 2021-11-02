import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { StorageMap } from '@ngx-pwa/local-storage';

import { WpxApi } from './common/wpx-api';
import { WpxCollection } from './common/wpx-collection';
import { CollectionType } from './types';
import { WpxConfig } from './wpx-config';

@Injectable({
  providedIn: 'root'
})
export class WpxService {
  /**
   * 静态资源地址
   */
  readonly assets: string;
  /**
   * 上传地址
   */
  readonly upload?: string;

  constructor(
    private config: WpxConfig,
    @Optional() private storage: StorageMap,
    @Optional() private router: Router,
    @Optional() private http: HttpClient
  ) {
    this.assets = config.assets;
    if (config.upload) {
      this.upload = typeof config.upload === 'string' ? config.upload : config.upload.url;
    }
  }

  /**
   * 创建统一请求
   */
  createApi(model: string): WpxApi {
    return new WpxApi({
      http: this.http,
      baseUrl: this.config.baseUrl,
      model
    });
  }

  api(model: string): WpxApi {
    return new WpxApi({
      http: this.http,
      baseUrl: this.config.baseUrl,
      model
    });
  }

  /**
   * 创建数据集合
   */
  collection<T extends CollectionType>(key: string): WpxCollection<T> {
    return new WpxCollection<T>({
      key: `collection:${key}`,
      storage: this.storage
    });
  }
}

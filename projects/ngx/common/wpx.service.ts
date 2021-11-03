import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { StorageMap } from '@ngx-pwa/local-storage';

import { Config } from './config';
import { WpxApi } from './helper/wpx-api';
import { WpxCollection } from './helper/wpx-collection';
import { CollectionValue } from './types';

@Injectable({ providedIn: 'root' })
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
    private config: Config,
    @Optional() private router: Router,
    @Optional() private http: HttpClient,
    @Optional() private storage: StorageMap
  ) {
    this.assets = config.assets;
    if (config.upload) {
      this.upload = typeof config.upload === 'string' ? config.upload : config.upload.url;
    }
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
  collection<T extends CollectionValue>(key: string): WpxCollection<T> {
    return new WpxCollection<T>({
      key: `collection:${key}`,
      storage: this.storage
    });
  }
}

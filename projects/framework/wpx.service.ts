import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';

import { WpxApi } from './common/wpx-api';
import { WpxData } from './common/wpx-data';
import { ListsOption } from './types';
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
  api(model: string): WpxApi {
    return new WpxApi(this.http, {
      baseUrl: this.config.baseUrl,
      model
    });
  }

  /**
   * 创建数据源
   */
  data(option: ListsOption): WpxData {
    option.limit = option.limit || this.config.page;
    return new WpxData(this.storage, option);
  }

  /**
   * 清除应用本地存储
   */
  clear(): void {
    this.storage
      .keys()
      .pipe(
        filter(
          v => ['resource', 'router'].includes(v) || v.search(/^search:\S+$/) !== -1 || v.search(/^page:\S+$/) !== -1
        ),
        switchMap(key => this.storage.delete(key))
      )
      .subscribe(() => {});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { BitConfig } from './bit-config';
import { Api } from './common/api';
import { Lists } from './common/lists';
import { ListsOption } from './types';

@Injectable({
  providedIn: 'root'
})
export class BitService {
  /**
   * 静态资源地址
   */
  readonly assets: string;
  /**
   * 上传地址
   */
  readonly upload?: string;

  constructor(
    private config: BitConfig,
    @Optional() private storage: StorageMap,
    @Optional() private router: Router,
    @Optional() private http: HttpClient,
    @Optional() private fb: FormBuilder,
    @Optional() private nzI18nService: NzI18nService
  ) {
    this.assets = config.assets;
    if (config.upload) {
      this.upload = typeof config.upload === 'string' ? config.upload : config.upload.url;
    }
  }

  /**
   * 创建统一请求
   */
  api(model: string): Api {
    return new Api(this.http, {
      baseUrl: this.config.baseUrl,
      model
    });
  }

  /**
   * 创建分页处理
   */
  lists(option: ListsOption): Lists {
    option.limit = option.limit || this.config.page;
    return new Lists(this.storage, option);
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

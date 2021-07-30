import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { BitConfig } from './bit-config';
import { Api } from './common/api';
import { ListByPage } from './common/list-by-page';
import { ListByPageOption, I18nGroupOption, PageHeader } from './types';

@Injectable({ providedIn: 'root' })
export class BitService {
  /**
   * 静态资源地址
   */
  readonly assets: string;
  /**
   * 上传地址
   */
  readonly upload?: string;
  /**
   * 语言包 ID
   */
  locale?: string;
  /**
   * 语言包状态
   */
  readonly localeChanged?: Subject<string>;
  /**
   * 语言包
   */
  private packer?: Map<string, any>;
  /**
   * 语言包引用
   */
  l: Record<string, string> = {};
  /**
   * 页头属性
   */
  ph: Partial<PageHeader> = {};

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
    if (config.locale) {
      this.packer = new Map();
      this.localeChanged = new Subject<string>();
      this.setLocale(localStorage.getItem('locale') || config.locale.default);
    }
  }

  /**
   * 载入语言包
   */
  registerLocales(packer: Record<string, any>): void {
    this.packer = new Map([...this.packer!, ...Object.entries(packer)]);
    const index = this.config.locale!.mapping.indexOf(this.locale!)!;
    for (const [key, data] of this.packer.entries()) {
      this.l[key] = data[index];
    }
  }

  /**
   * 设置语言包 ID
   */
  setLocale(id: string): void {
    this.locale = id;
    localStorage.setItem('locale', id);
    const index = this.config.locale!.mapping.indexOf(this.locale)!;
    for (const [key, data] of this.packer!.entries()) {
      this.l[key] = data[index];
    }
    this.nzI18nService.setLocale(this.config.locale!.bind[index]);
    this.localeChanged!.next(id);
  }

  /**
   * 创建国际化 FormGroup
   */
  i18nGroup(options: Partial<I18nGroupOption>): FormGroup {
    const controls: Record<string, any[]> = {};
    for (const ID of this.config.i18n!.contain) {
      controls[ID] = new Array(3).fill(null);
      controls[ID][0] = options.value?.[ID];
      controls[ID][1] = options.validate?.[ID];
      controls[ID][2] = options.asyncValidate?.[ID];
    }
    return this.fb.group(controls);
  }

  /**
   * 国际化数据转化
   */
  i18nData(value: string): Record<string, any> {
    const data: Record<string, any> = JSON.parse(value);
    for (const key of Object(data).keys) {
      if (!this.config.i18n!.contain.includes(key)) {
        Reflect.deleteProperty(data, key);
      }
    }
    return data;
  }

  /**
   * 创建 CRUD 请求
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
  listByPage(option: ListByPageOption): ListByPage {
    option.limit = option.limit || this.config.page;
    return new ListByPage(this.storage, option);
  }

  /**
   * 清除应用本地存储
   */
  clear(): void {
    this.storage
      .keys()
      .pipe(
        filter(
          v =>
            ['resource', 'router'].includes(v) ||
            v.search(/^search:\S+$/) !== -1 ||
            v.search(/^page:\S+$/) !== -1 ||
            v.search(/^cross:\S+$/) !== -1
        ),
        switchMap(key => this.storage.delete(key))
      )
      .subscribe(() => {});
  }
}

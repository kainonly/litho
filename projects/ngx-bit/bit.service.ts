import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { BitConfig } from './bit-config';
import { Api } from './common/api';
import { ListByPage } from './common/list-by-page';
import { ListByPageOption, I18nGroupOption } from './types';

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
   * 语言包模板变量
   */
  l: Record<string, string> = {};
  /**
   * 国际化 ID
   * @deprecated
   */
  i18n?: string;
  /**
   * 国际化状态
   */
  readonly i18nChanged?: Subject<string>;

  constructor(
    private config: BitConfig,
    @Optional() private storage: StorageMap,
    @Optional() private router: Router,
    @Optional() private location: Location,
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
    if (config.i18n) {
      this.i18nChanged = new Subject<string>();
      this.i18n = config.i18n.default;
    }
  }

  /**
   * 路由导航
   */
  open(commands: Array<string | Record<string, any>>, extras?: NavigationExtras): void {
    if (commands.length === 0) {
      throw new Error('路由导航 URL 数组不能为空');
    }
    const url = this.router.url;
    if (url !== '/') {
      const primary = this.router.parseUrl(url).root.children[PRIMARY_OUTLET];
      const segments = primary.segments;
      if (segments.length > 1) {
        const key = segments[0].path;
        this.storage.set(`history:${key}`, segments.splice(1)).subscribe(_ => _);
      }
    }
    this.router.navigate(commands, extras);
  }

  /**
   * 导航历史
   */
  history(key: string): void {
    this.storage.get(`history:${key}`).subscribe(data => {
      const segments = <UrlSegment[]>data;
      const commands = [key];
      if (segments && segments.length !== 0) {
        commands.push(...segments.map(v => v.path));
        this.storage.delete(`history:${key}`).subscribe(_ => _);
      }
      this.router.navigate(commands);
    });
  }

  /**
   * 导航返回
   * @deprecated
   */
  back(): void {
    this.location.back();
    this.resetI18n();
  }

  /**
   * 注册语言包
   */
  registerLocales(args: Record<string, any> | Promise<any>): void {
    if (args instanceof Promise) {
      args.then(value => {
        this.importLocales(value.default as Record<string, any>);
      });
    } else {
      this.importLocales(args.default ?? {});
    }
  }

  /**
   * 载入语言包
   */
  private importLocales(data: Record<string, any>): void {
    this.packer = new Map([...this.packer!, ...Object.entries(data)]);
    const index = this.config.locale!.mapping.indexOf(this.locale!)!;
    for (const [key, data] of this.packer.entries()) {
      this.l[key] = data[index];
    }
  }

  /**
   * 设置语言包 ID
   */
  setLocale(locale: string): void {
    this.locale = locale;
    localStorage.setItem('locale', locale);
    const index = this.config.locale!.mapping.indexOf(this.locale)!;
    for (const [key, data] of this.packer!.entries()) {
      this.l[key] = data[index];
    }
    this.nzI18nService.setLocale(this.config.locale!.bind[index]);
    this.localeChanged!.next(locale);
  }

  /**
   * @deprecated
   */
  get i18nContain(): string[] {
    return this.config.i18n!.contain;
  }

  /**
   * 国际化 ID 是否相等
   * @deprecated
   */
  equalI18n(i18n: string): boolean {
    return this.i18n === i18n;
  }

  /**
   * 重置国际化 ID
   * @deprecated
   */
  resetI18n(): void {
    this.i18n = this.config.i18n!.default;
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
   * @deprecated i18nData
   */
  i18nParse(value: string): Record<string, any> {
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

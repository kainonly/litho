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
import { ListByPageOption, I18nGroupOption, I18nTooltipOption } from './types';

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
  private language?: Map<string, unknown>;
  /**
   * 语言包模板变量
   */
  l: Record<string, string> = {};
  /**
   * 国际化 ID
   */
  i18n?: string;
  /**
   * 国际化状态
   */
  readonly i18nChanged?: Subject<string>;
  /**
   * 国际化输入提示状态
   */
  i18nTooltip: I18nTooltipOption = {};

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
      this.language = new Map();
      this.setLocale(localStorage.getItem('locale') || config.locale.default);
      this.localeChanged = new Subject<string>();
    }
    if (config.i18n) {
      this.i18n = config.i18n.default;
      this.i18nChanged = new Subject<string>();
    }
  }

  /**
   * 路由导航
   */
  open(commands: string[], extras?: NavigationExtras): void {
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
   */
  back(): void {
    this.location.back();
    this.resetI18n();
  }

  /**
   * 载入语言包
   */
  registerLocales(packer: Record<string, unknown>): void {
    this.language = new Map([...this.language!, ...Object.entries(packer)]);
    const index = this.config.locale!.mapping.indexOf(this.locale!)!;
    for (const [key, value] of this.language.entries()) {
      const data = value as Record<string, unknown>;
      this.l[key] = data[index] as string;
    }
  }

  /**
   * 设置语言包 ID
   */
  setLocale(locale: string): void {
    this.locale = locale;
    localStorage.setItem('locale', locale);
    const index = this.config.locale!.mapping.indexOf(this.locale)!;
    for (const [key, value] of this.language!.entries()) {
      const data = value as Record<string, unknown>;
      this.l[key] = data[index] as string;
    }
    this.nzI18nService.setLocale(this.config.locale!.bind[index]);
    this.localeChanged!.next(locale);
  }

  get i18nContain(): string[] {
    return this.config.i18n!.contain;
  }

  /**
   * 国际化 ID 是否相等
   */
  equalI18n(i18n: string): boolean {
    return this.i18n === i18n;
  }

  /**
   * 重置国际化 ID
   */
  resetI18n(): void {
    this.i18n = this.config.i18n!.default;
  }

  /**
   * 创建国际化 FormGroup
   */
  i18nGroup(options: Partial<I18nGroupOption>): FormGroup {
    const controls: Record<string, unknown[]> = {};
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
  i18nParse(value: string): Record<string, unknown> {
    const data: Record<string, unknown> = JSON.parse(value);
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

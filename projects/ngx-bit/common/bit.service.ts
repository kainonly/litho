import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Location } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { BitConfig } from './bit-config';
import { ListByPageOption, I18nGroupOption, I18nTooltipOption, I18nOption } from './types';
import { ListByPage } from './utils/list-by-page';
import { BitCurdService } from './bit-curd.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BitService {
  /**
   * 静态资源地址
   * Static resource address
   */
  readonly static: string;
  /**
   * 上传地址
   * Upload address
   */
  readonly uploads: string;
  /**
   * 公共语言包
   * Common language pack
   */
  private language: Map<string, any> = new Map();
  /**
   * 默认语言包 ID
   * Default language ID
   */
  readonly localeDefault: string;
  /**
   * 语言包 ID 索引
   * Language ID index
   */
  readonly localeMapping: string[];
  /**
   * 语言包 ID 与 NG-ZORRO 语言包关联
   * Language ID associated with NG-ZORRO language
   */
  readonly localeBind: any[];
  /**
   * 语言包 ID
   * Language ID
   */
  locale: string;
  /**
   * 语言包 ID 状态
   * Language ID changed
   */
  readonly localeChanged: Subject<string> = new Subject<string>();
  /**
   * 语言包引用
   * Language pack reference
   */
  l: any = {};
  /**
   * 默认国际化 ID，^ 国际化是面向表单输入的
   * Default I18n ID, ^ I18n is for form input
   */
  readonly i18nDefault: string;
  /**
   * 国际化 ID
   * I18n ID
   */
  i18n: string;
  /**
   * 国际化 ID 状态
   * I18n ID changed
   */
  readonly i18nChanged: Subject<string> = new Subject<string>();
  /**
   * 国际化包含语言 ID
   * I18n includes languages ID
   */
  i18nContain: any[] = [];
  /**
   * 国际化详情
   * I18n Detail
   */
  i18nSwitch: I18nOption[];
  /**
   * 国际化输入提示状态
   * I18n tooltip status
   */
  i18nTooltip: I18nTooltipOption = {};
  /**
   * 默认分页限制
   * Default Page Limit
   */
  readonly pageDefault: number;

  constructor(
    bitConfig: BitConfig,
    @Optional() private curd: BitCurdService,
    @Optional() private storage: StorageMap,
    @Optional() private router: Router,
    @Optional() private location: Location,
    @Optional() private nzI18nService: NzI18nService
  ) {
    this.static = bitConfig.url.static;
    this.uploads = bitConfig.url.api + bitConfig.api.upload;
    this.localeDefault = bitConfig.locale.default;
    this.localeMapping = bitConfig.locale.mapping;
    this.localeBind = bitConfig.locale.bind;
    this.i18nDefault = bitConfig.i18n.default;
    this.i18n = bitConfig.i18n.default;
    this.i18nContain = bitConfig.i18n.contain;
    this.i18nSwitch = bitConfig.i18n.switch;
    this.pageDefault = bitConfig.page;
  }

  /**
   * 路由导航
   * Route navigation
   */
  open(path: any[], extras?: NavigationExtras): void {
    if (path.length === 0) {
      return;
    }
    const url = this.router.url;
    if (url !== '/') {
      const primary = this.router.parseUrl(url).root.children[PRIMARY_OUTLET];
      const segments = primary.segments;
      if (segments.length > 1) {
        const key = segments[0].path;
        this.storage.set('history:' + key, segments.splice(1)).subscribe(_ => _);
      }
    }
    const commands = [];
    path.forEach(value => {
      if (typeof value === 'string') {
        commands.push(...value.split('/'));
      } else {
        commands.push(value);
      }
    });
    this.router.navigate(commands, extras);
  }

  /**
   * 导航历史
   * Navigation history
   */
  history(key: string): void {
    this.storage.get('history:' + key).subscribe((segments: UrlSegment[]) => {
      const commands = [key];
      if (segments && segments.length !== 0) {
        commands.push(...segments.map(v => v.path));
        this.storage.delete('history:' + key).subscribe(_ => _);
      }
      this.router.navigate(commands);
    });
  }

  /**
   * 导航返回
   * Navigate back
   */
  back(): void {
    this.location.back();
    this.resetI18n();
  }

  /**
   * 初始化语言包
   * Setup language pack
   */
  setupLocale(): void {
    this.l = {};
    this.setLocale(localStorage.getItem('locale') || this.localeDefault);
  }

  /**
   * 载入语言包
   * Registered language pack
   */
  registerLocales(packer: object | Promise<any>): void {
    Promise.resolve(packer).then(result => {
      if (!result.default) {
        return;
      }
      this.language = new Map([...this.language, ...Object.entries(result.default)]);
      const index = this.localeDefault.indexOf(this.locale);
      for (const [key, data] of this.language.entries()) {
        this.l[key] = data[index];
      }
    });
  }

  /**
   * 设置语言包 ID
   * Set language ID
   */
  setLocale(locale: string): void {
    this.locale = locale;
    localStorage.setItem('locale', locale);
    const index = this.localeMapping.indexOf(this.locale);
    for (const [key, data] of this.language.entries()) {
      this.l[key] = data[index];
    }
    this.nzI18nService.setLocale(this.localeBind[index]);
    this.localeChanged.next(locale);
  }

  /**
   * 国际化 ID 是否相等
   * Are the I18n IDs equal
   */
  equalI18n(i18n: string): boolean {
    return this.i18n === i18n;
  }

  /**
   * 重置国际化 ID
   * Reset I18n ID
   */
  resetI18n(): void {
    this.i18n = this.i18nDefault;
  }

  /**
   * 生成 I18n FormGroup
   * Generate I18n FormGroup
   */
  i18nGroup(options: I18nGroupOption): any {
    const controls = {};
    if (options) {
      for (const ID of this.i18nContain) {
        controls[ID] = [null, [], []];
        if (options.value !== undefined && options.value.hasOwnProperty(ID)) {
          controls[ID][0] = options.value[ID];
        }
        if (options.validate !== undefined && options.validate.hasOwnProperty(ID)) {
          controls[ID][1] = options.validate[ID];
        }
        if (options.asyncValidate !== undefined && options.asyncValidate.hasOwnProperty(ID)) {
          controls[ID][2] = options.asyncValidate[ID];
        }
      }
    }
    return controls;
  }

  /**
   * 解析国际化数据
   * Parse i18n string json
   */
  i18nParse(text: string): any {
    const json: any = JSON.parse(text);
    const data: any = {};
    for (const ID of this.i18nContain) {
      if (json.hasOwnProperty(ID)) {
        data[ID] = json[ID];
      }
    }
    return data;
  }

  /**
   * 生产分页数据对象
   * Factory list by page
   */
  listByPage(option: ListByPageOption): ListByPage {
    option.limit = option.limit || this.pageDefault;
    return new ListByPage(this.curd, this.storage, option);
  }

  /**
   * 清除应用本地存储
   * Clear app local storage
   */
  clear(): void {
    this.storage.keys().pipe(
      filter(v =>
        ['resource', 'router'].includes(v) ||
        v.search(/^search:\S+$/) !== -1 ||
        v.search(/^page:\S+$/) !== -1 ||
        v.search(/^cross:\S+$/) !== -1
      ),
      switchMap(key => this.storage.delete(key))
    ).subscribe(_ => _);
  }
}

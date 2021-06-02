import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { BitConfigService } from './bit-config.service';
import { BitSupportService } from './bit-support.service';
import { ListByPageOption, I18nGroupOption, I18nTooltipOption } from './typings';
import { ListByPage } from './list-by-page';
import { Subject } from 'rxjs';

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
   * Component i18n identifier
   */
  i18n: string;
  /**
   * Component i18n tooltips
   */
  i18nTooltip: I18nTooltipOption = {};
  /**
   * Component i18n
   */
  i18nContain: any[] = [];

  constructor(
    private config: BitConfigService,
    private location: Location,
    private router: Router,
    private storageMap: StorageMap,
    private nzI18nService: NzI18nService,
    @Optional() public support: BitSupportService
  ) {
    this.static = config.url.static;
    this.uploads = config.url.api + config.api.upload;
    this.i18n = config.i18n.default;
    this.i18nContain = config.i18n.contain;
  }

  /**
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
        this.storageMap.set(
          'history:' + key, segments.splice(1)
        ).subscribe(() => {
        });
      }
    }
    const commands = [];
    path.forEach((value) => {
      if (typeof value === 'string') {
        commands.push(...value.split('/'));
      } else {
        commands.push(value);
      }
    });
    this.router.navigate(commands, extras);
  }

  /**
   * Route history
   */
  history(key: string): void {
    this.storageMap.get('history:' + key).subscribe((segments: UrlSegment[]) => {
      const commands = [key];
      if (segments && segments.length !== 0) {
        commands.push(...segments.map(v => v.path));
        this.storageMap.delete('history:' + key).subscribe(() => {
        });
      }
      this.router.navigate(commands);
    });
  }

  /**
   * Route back
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
    this.setLocale(
      localStorage.getItem('locale') ||
      this.config.locale.default
    );
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
      this.language = new Map([
        ...this.language,
        ...Object.entries(result.default)
      ]);
      const index = this.config.locale.mapping.indexOf(this.locale);
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
    this.localeChanged.next(locale);
    const index = this.config.locale.mapping.indexOf(this.locale);
    for (const [key, data] of this.language.entries()) {
      this.l[key] = data[index];
    }
    this.nzI18nService.setLocale(this.config.locale.bind[index]);
  }

  /**
   * factory list by page
   */
  listByPage(option: ListByPageOption): ListByPage {
    if (!option.limit) {
      option.limit = this.config.page;
    }
    return new ListByPage(option, this.storageMap);
  }

  /**
   * Equal i18n ID
   */
  equalI18n(i18n: string): boolean {
    return this.i18n === i18n;
  }

  /**
   * Reset I18n ID
   */
  resetI18n(): void {
    this.i18n = this.config.i18n.default.toString();
  }

  /**
   * Init i18n form group
   */
  i18nGroup(options: I18nGroupOption): any {
    const controls = {};
    if (options) {
      for (const ID of this.config.i18n.contain) {
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
   * Parse i18n string json
   */
  i18nParse(raws: string): any {
    const lang: any = JSON.parse(raws);
    const data: any = {};
    for (const ID of this.config.i18n.contain) {
      if (lang.hasOwnProperty(ID)) {
        data[ID] = lang[ID];
      }
    }
    return data;
  }
}

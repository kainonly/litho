import { Injectable, Optional } from '@angular/core';
import { NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { BitConfig } from './bit-config';
import { ListByPageOption, I18nGroupOption, I18nTooltipOption } from './types';
import { ListByPage } from './utils/list-by-page';
import { BitCurdService } from './bit-curd.service';

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
   * 国际化包含语言 ID
   * I18n includes languages ID
   */
  i18nContain: any[] = [];
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
    @Optional() private nzI18nService: NzI18nService
  ) {
    this.static = bitConfig?.url?.static;
    this.uploads = bitConfig?.url?.api + bitConfig?.api?.upload;
    this.localeDefault = bitConfig?.locale?.default ?? 'zh_cn';
    this.localeMapping = bitConfig?.locale?.mapping ?? ['zh_cn'];
    this.localeBind = bitConfig?.locale?.bind ?? [zh_CN];
    this.i18nDefault = bitConfig?.i18n?.default ?? 'zh_cn';
    this.i18n = bitConfig?.i18n?.default ?? 'zh_cn';
    this.i18nContain = bitConfig?.i18n?.contain ?? ['zh_cn'];
    this.pageDefault = bitConfig?.page ?? 10;
  }

  /**
   * 初始化语言包
   * Setup language pack
   */
  setupLocale(): void {
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
      this.language = new Map([
        ...this.language,
        ...Object.entries(result.default)
      ]);
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
    this.localeChanged.next(locale);
    const index = this.localeMapping.indexOf(this.locale);
    for (const [key, data] of this.language.entries()) {
      this.l[key] = data[index];
    }
    this.nzI18nService.setLocale(this.localeBind[index]);
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
   * 生产分页数据对象
   * Factory list by page
   */
  listByPage(option: ListByPageOption): ListByPage {
    option.limit = option.limit || this.pageDefault;
    return new ListByPage(this.curd, option);
  }
}

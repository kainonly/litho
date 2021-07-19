import { Injectable } from '@angular/core';

import { I18n, Locale, Upload } from './types';

@Injectable({ providedIn: 'root' })
export class BitConfig {
  /**
   * 基础路径
   */
  baseUrl = '/api/';
  /**
   * 静态资源地址
   */
  assets = '/assets/';
  /**
   * 默认分页限制
   */
  page = 20;
  /**
   * 上传
   */
  upload?: Upload;
  /**
   * 本地语言包
   */
  locale?: Locale;
  /**
   * 国际化输入
   */
  i18n?: I18n;
}

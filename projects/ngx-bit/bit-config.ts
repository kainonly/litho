import { Injectable } from '@angular/core';

import { Grid, I18n, Locale, Upload } from './types';

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
  page = 10;
  /**
   * 栅格标识
   */
  grid: Grid = {
    label: {
      nzSpan: 7
    },
    control: {
      nzSpan: 12
    },
    submit: {
      nzOffset: 7,
      nzSpan: 12
    }
  };
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

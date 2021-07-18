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
  page = 20;
  /**
   * 栅格标识
   */
  grid: Grid = {
    label: {
      nzXXl: 4,
      nzXl: 6,
      nzLg: 6,
      nzSm: 7
    },
    control: {
      nzXXl: 6,
      nzXl: 8,
      nzLg: 10,
      nzSm: 12
    },
    i18n: {
      nzXXl: 8,
      nzXl: 10,
      nzLg: 12,
      nzSm: 14
    },
    submit: {
      nzXXl: { offset: 4, span: 6 },
      nzXl: { offset: 6, span: 8 },
      nzLg: { offset: 6, span: 10 },
      nzSm: { offset: 7, span: 12 }
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

import { Injectable } from '@angular/core';
import { Grid, I18n, Locale, Upload } from './types';

@Injectable({ providedIn: 'root' })
export class BITCONFIG {
  /**
   * 基础路径
   */
  baseUrl: string = '/api/';
  /**
   * 静态资源地址
   */
  assets: string = '/assets/';
  /**
   * 默认分页限制
   */
  page: number = 10;
  /**
   * 栅格标识
   */
  grid: Grid = {
    label: {
      nzXXl: 4,
      nzXl: 5,
      nzLg: 6,
      nzMd: 7,
      nzSm: 24
    },
    control: {
      nzXXl: 8,
      nzXl: 9,
      nzLg: 10,
      nzMd: 14,
      nzSm: 24
    },
    submit: {
      nzXXl: { span: 8, offset: 4 },
      nzXl: { span: 9, offset: 5 },
      nzLg: { span: 10, offset: 6 },
      nzMd: { span: 14, offset: 6 },
      nzSm: { span: 24, offset: 0 }
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

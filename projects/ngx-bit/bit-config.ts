import { Injectable } from '@angular/core';

import { Upload } from './types';

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
   * 上传
   */
  upload?: Upload;
  /**
   * 默认分页限制
   */
  page = 20;
}

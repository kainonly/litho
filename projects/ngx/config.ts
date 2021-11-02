import { Injectable } from '@angular/core';

import { Upload } from './types';

@Injectable({ providedIn: 'root' })
export class Config {
  /**
   * 基础路径
   */
  baseUrl = '/api';
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传
   */
  upload?: Upload;
}

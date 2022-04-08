import { Injectable } from '@angular/core';

import { AnyDto, Page, UploadOption } from './types';

@Injectable({ providedIn: 'root' })
export class WpxService {
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传地址
   */
  upload?: UploadOption;
  /**
   * 导航数据
   */
  navs?: Array<AnyDto<Page>>;
  /**
   * 导航索引
   */
  pages: Record<string, AnyDto<Page>> = {};
  /**
   * 当前页面
   */
  pageId?: string;
  /**
   * 退出登录
   */
  onLogout = (): void => {};

  /**
   * 设置静态资源
   * @param value
   */
  setAssets(value: string): void {
    this.assets = value;
  }

  /**
   * 设置上传配置
   * @param value
   */
  setUpload(value: UploadOption): void {
    this.upload = value;
  }

  /**
   * 设置页面数据
   * @param values 页面数据
   */
  setPages(values: Array<AnyDto<Page>>): void {
    const pages: Record<string, AnyDto<Page>> = {};
    const navs: Array<AnyDto<Page>> = [];
    for (const x of values) {
      pages[x._id] = x;
      x._children = [];
      if (!x.parent) {
        x._path = [x._id];
        navs.push(x);
      } else {
        if (pages.hasOwnProperty(x.parent)) {
          x._path = [...pages[x.parent]._path!, x._id];
          pages[x.parent]._children!.push(x);
        }
      }
    }
    this.pages = pages;
    this.navs = navs;
  }
}

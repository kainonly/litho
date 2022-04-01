import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AnyDto, LayoutOption, Page, UploadOption } from './types';

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
   * 布局设置
   */
  layout: BehaviorSubject<Partial<LayoutOption>> = new BehaviorSubject<Partial<LayoutOption>>({});
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
   * 设置导航数据
   * @param value 页面传输对象
   */
  setNavs(value: Array<AnyDto<Page>>): void {
    const navs: Array<AnyDto<Page>> = [];
    const pages: Record<string, AnyDto<Page>> = {};
    for (const x of value) {
      pages[x._id] = x;
      x['children'] = [];
      if (!x.parent) {
        x['path'] = [x._id];
        navs.push(x);
      } else {
        if (pages.hasOwnProperty(x.parent)) {
          x['path'] = [...pages[x.parent]['path'], x._id];
          pages[x.parent]['children'].push(x);
        }
      }
    }
    this.navs = navs;
    this.pages = pages;
  }
}

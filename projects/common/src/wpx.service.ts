import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnyDto, Page } from './types';

@Injectable({ providedIn: 'root' })
export class WpxService {
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传地址
   */
  upload?: { url?: string; size?: number; presignedUrl?: string };
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

  constructor(private http: HttpClient) {}

  /**
   * 设置静态资源
   * @param url
   */
  setAssets(url: string): void {
    this.assets = url;
  }

  /**
   * 设置上传配置
   * @param url 本地上传路径或对象存储路径
   * @param size 限制上传大小
   * @param presignedUrl 用于获取对象存储上传签名参数的请求地址
   */
  setUpload(url: string, size?: number, presignedUrl?: string): void {
    this.upload = { url, size, presignedUrl };
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
      x['children'] = [];
      if (!x.parent) {
        x['path'] = [x._id];
        navs.push(x);
      } else {
        if (pages.hasOwnProperty(x.parent)) {
          x['_path'] = [...pages[x.parent]['path']!, x._id];
          pages[x.parent]['children']!.push(x);
        }
      }
    }
    this.pages = pages;
    this.navs = navs;
  }

  /**
   * 获取多个应用变量
   * @param keys
   */
  getVars(...keys: string[]): Observable<any> {
    return this.http.get('vars', {
      params: {
        keys
      }
    });
  }

  /**
   * 获取应用变量
   * @param key
   */
  getVar(key: string): Observable<any> {
    return this.http.get(`vars/${key}`);
  }

  /**
   * 设置应用变量
   * @param key
   * @param value
   */
  setVar(key: string, value: any): Observable<any> {
    return this.http.put(`vars/${key}`, { value });
  }
}

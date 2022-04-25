import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';

import { AnyDto, Page, UserInfo } from './types';

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
   * 导航索引
   */
  pages: AsyncSubject<Record<string, AnyDto<Page>>> = new AsyncSubject<Record<string, AnyDto<Page>>>();
  /**
   * 当前页面 ID
   */
  pageId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /**
   * 导航数据
   */
  navs?: Array<AnyDto<Page>>;
  /**
   * 手动设置路由
   */
  manual = false;

  user?: UserInfo;

  constructor(private http: HttpClient, private storage: StorageMap) {}

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
   * 载入页面内容
   */
  loadPages(): Observable<Array<AnyDto<Page>>> {
    return this.http.get<Array<AnyDto<Page>>>('navs').pipe(
      map(v => {
        const pages: Record<string, AnyDto<Page>> = {};
        const navs: Array<AnyDto<Page>> = [];
        for (const x of v) {
          x['children'] = [];
          pages[x._id] = x;
        }
        for (const x of v) {
          if (!x.parent) {
            navs.push(x);
          } else {
            if (pages.hasOwnProperty(x.parent)) {
              x['parentNode'] = pages[x.parent];
              pages[x.parent]['children']!.push(x);
            }
          }
        }
        this.pages.next(pages);
        this.pages.complete();
        this.navs = navs;
        return v;
      })
    );
  }

  /**
   * 登录
   */
  login(data: { user: string; password: string }): Observable<any> {
    return this.http.post('auth', data);
  }

  /**
   * 主动验证
   */
  verify(): Observable<HttpResponse<any>> {
    return this.http.head('auth', { observe: 'response' });
  }

  /**
   * 申请刷新验证码
   */
  code(): Observable<any> {
    return this.http.get('auth');
  }

  /**
   * 刷新认证
   */
  refreshToken(code: string): Observable<any> {
    return this.http.put('auth', {
      code
    });
  }

  /**
   * 登出
   */
  logout(): Observable<any> {
    return this.http.delete('auth').pipe(switchMap(() => this.storage.delete('user')));
  }

  /**
   * 获取个人用户信息
   */
  getUser(full = false): Observable<UserInfo> {
    return this.http.get<UserInfo>('user', { params: { full } }).pipe(
      map(v => {
        this.user = v;
        return v;
      })
    );
  }

  /**
   * 更新个人用户信息
   * @param data
   */
  setUser(data: any): Observable<any> {
    return this.http.patch('user', data);
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

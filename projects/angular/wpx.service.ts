import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env';
import { StorageMap } from '@ngx-pwa/local-storage';

import { AnyDto, ApiOptions, Filter, FindOption, Page, UserInfo } from './types';
import { httpOptions } from './util/helper';

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
   * 获取密码重置验证码
   */
  forgetCaptcha(email: string): Observable<any> {
    return this.http.get('forget-captcha', { params: { email } });
  }

  /**
   * 验证密码重置验证码
   */
  forgetVerify(data: any): Observable<any> {
    return this.http.post('forget-verify', data);
  }

  forgetReset(data: any): Observable<any> {
    return this.http.post('forget-reset', data);
  }

  /**
   * 判断当前用户可变更属性
   */
  checkUser(key: 'username' | 'email', value: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.head('user/_check', {
          observe: 'response',
          params: {
            key,
            value
          }
        })
      ),
      map(res => {
        const exists = res.headers.get('wpx-exists') === 'true';
        return exists ? { error: true, duplicated: exists } : null;
      })
    );
  }

  /**
   * 获取个人用户信息
   */
  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>('user').pipe(
      map(v => {
        this.user = v;
        return v;
      })
    );
  }

  /**
   * 更新个人用户信息
   * @param action
   * @param data
   */
  setUser(action: string, data: any): Observable<any> {
    return this.http.post('user', data, {
      headers: {
        'wpx-action': action
      }
    });
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

  /**
   * 日志查询
   * @param name
   * @param filter
   * @param options
   */
  logs<T>(name: string, filter: Filter<T>, options?: FindOption<T>): Observable<Array<AnyDto<T>>> {
    return this.http.get<Array<AnyDto<T>>>(`api/${name}`, httpOptions(options as ApiOptions<T>, filter));
  }

  /**
   * 获取飞书授权 URL
   */
  feishu(action?: string): Observable<string> {
    const state = JSON.stringify({
      action
    });
    return this.http.get<any>('feishu/_option').pipe(
      map(v => {
        const redirect_uri = encodeURIComponent(v.redirect);
        return `${v.url}?redirect_uri=${redirect_uri}&app_id=${v.app_id}&state=${state}`;
      })
    );
  }
}

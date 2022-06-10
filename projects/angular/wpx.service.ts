import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentType } from '@angular/cdk/portal/portal';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';

import { AnyDto, ApiOptions, ComponentTypeOption, Filter, FindOption, Page, UploadOption, UserInfo } from './types';
import { httpOptions } from './util/helper';

@Injectable({ providedIn: 'root' })
export class WpxService {
  /**
   * 静态资源地址
   */
  assets = '/assets';
  /**
   * 上传类型
   */
  upload: AsyncSubject<UploadOption> = new AsyncSubject<UploadOption>();
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
  /**
   * 用户信息
   */
  user?: UserInfo;
  /**
   * 自定义页面
   */
  scopes: Map<string, ComponentTypeOption<any>> = new Map<string, ComponentTypeOption<any>>();
  /**
   * 自定义组件
   */
  components: Map<string, ComponentTypeOption<any>> = new Map<string, ComponentTypeOption<any>>();

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
   */
  loadUpload(): Observable<UploadOption> {
    return this.http
      .get<UploadOption>('options', {
        params: { type: 'upload' }
      })
      .pipe(
        map(v => {
          this.upload.next(v);
          this.upload.complete();
          return v;
        })
      );
  }

  loadOAuth(action?: string): Observable<string> {
    const state = JSON.stringify({
      action
    });
    return this.http
      .get<any>('options', {
        params: { type: 'office' }
      })
      .pipe(
        map(v => {
          const redirect_uri = encodeURIComponent(v.redirect);
          return `${v.url}?redirect_uri=${redirect_uri}&app_id=${v.app_id}&state=${state}`;
        })
      );
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
   * 刷新认证
   */
  refreshToken(): Observable<any> {
    return this.http.get<any>('auth').pipe(
      switchMap(v =>
        this.http.put('auth', {
          code: v.code
        })
      )
    );
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
  getCaptcha(email: string): Observable<any> {
    return this.http.get('captcha', { params: { email } });
  }

  /**
   * 验证密码重置验证码
   */
  verifyCaptcha(data: any): Observable<any> {
    return this.http.post('captcha', data);
  }

  /**
   * 重置用户密码
   */
  resetUser(data: any): Observable<any> {
    return this.http.post('user/reset', data);
  }

  /**
   * 判断当前用户可变更属性
   */
  existsUser(key: 'username' | 'email', value: string): Observable<any> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.head('user/_exists', {
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
   * 获取应用变量
   * @param keys
   * @deprecated
   */
  getVars(...keys: string[]): Observable<any> {
    return this.http.get('vars', {
      params: {
        keys
      }
    });
  }

  /**
   * 设置应用变量
   * @param key
   * @param value
   * @deprecated
   */
  setVar(key: string, value: any): Observable<any> {
    return this.http.put(`vars/${key}`, { value });
  }

  /**
   * 获取动态配置
   * @param keys
   */
  getValues(...keys: string[]): Observable<any> {
    return this.http.get('values', {
      params: {
        keys
      }
    });
  }

  /**
   * 设置动态配置
   * @param data 配置
   */
  setValues(data: Record<string, any>): Observable<any> {
    return this.http.patch('values', data);
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
   * 设置自定义页面
   * @param key 唯一标识
   * @param name 名称
   * @param component 组件
   */
  setScope<T>(key: string, name: string, component: ComponentType<T>): void {
    this.scopes.set(key, {
      name,
      component: new ComponentPortal<T>(component)
    });
  }

  /**
   * 设置自定义组件
   * @param key 唯一标识
   * @param name 名称
   * @param component 组件
   */
  setComponent<T>(key: string, name: string, component: ComponentType<T>): void {
    this.components.set(key, {
      name,
      component: new ComponentPortal<T>(component)
    });
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { UserInfo } from '@common/types';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AnyDto, Page } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient, private storage: StorageMap) {}

  /**
   * 用户信息
   */
  get user(): Observable<UserInfo | undefined> {
    return this.storage.get<UserInfo>(`user`, {
      type: 'object',
      required: ['username'],
      properties: {
        username: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        avatar: {
          type: 'string'
        }
      }
    });
  }

  /**
   * 登录
   */
  login(data: { user: string; password: string }): Observable<any> {
    return this.http.post('auth', data).pipe(switchMap(v => this.storage.set('user', v)));
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
    return this.http.delete('auth').pipe(switchMap(() => this.storage.delete(`user`)));
  }

  /**
   * 获取导航数据
   */
  navs(): Observable<Array<AnyDto<Page>>> {
    return this.http.get<Array<AnyDto<Page>>>('navs');
  }
}

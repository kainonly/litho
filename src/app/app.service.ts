import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { UserInfo } from '@common/types';

@Injectable({ providedIn: 'root' })
export class AppService {
  /**
   * 用户信息
   */
  user?: UserInfo;

  constructor(private http: HttpClient) {}

  /**
   * 登录
   * @param data
   */
  login(data: { identity: string; password: string }): Observable<any> {
    return this.http.post('login', data);
  }

  /**
   * 主动验证令牌
   */
  verify(): Observable<HttpResponse<any>> {
    return this.http.get('verify', { observe: 'response' });
  }

  /**
   * 刷新令牌
   */
  refreshToken(): Observable<any> {
    return this.http.get<any>('code').pipe(
      switchMap(v =>
        this.http.post('refresh_token', {
          code: v.code
        })
      )
    );
  }

  /**
   * 登出
   */
  logout(): Observable<any> {
    return this.http.post('logout', {});
  }

  /**
   * 获取个人用户信息
   */
  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>('user');
  }
}

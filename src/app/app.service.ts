import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project, UserInfo } from '@common/types';
import { AnyDto } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppService {
  /**
   * 项目
   */
  project?: AnyDto<Project>;
  /**
   * 用户
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
    return this.http.get<UserInfo>('user').pipe(
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
   * 重置用户密码
   */
  resetUser(data: any): Observable<any> {
    return this.http.post('user/reset', data);
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  /**
   * 刷新资源
   */
  readonly refresh$: Subject<undefined> = new Subject<undefined>();
  browserRefresh = true;

  constructor(private http: HttpClient) {}

  /**
   * 登录鉴权
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`auth`, {
      username,
      password
    });
  }

  /**
   * 验证鉴权
   */
  verify(): Observable<HttpResponse<any>> {
    return this.http.get(`auth`, { observe: 'response' });
  }

  /**
   * 获取刷新鉴权验证码
   */
  code(): Observable<any> {
    return this.http.get(`auth/mfcode`);
  }

  /**
   * 刷新鉴权
   */
  refreshToken(code: string): Observable<any> {
    return this.http.put(`auth`, {
      code
    });
  }

  /**
   * 注销鉴权
   */
  logout(): Observable<any> {
    return this.http.delete(`auth`);
  }

  /**
   * 获取系统信息
   */
  api(): Observable<any> {
    return this.http.get(`api`);
  }

  /**
   * 刷新资源
   */
  refresh(): void {
    this.refresh$.next(undefined);
  }
}

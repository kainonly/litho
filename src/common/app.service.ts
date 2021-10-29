import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { APIResponse, WpxConfig } from '@weplanx/ngx';
import { Page, WpxLayoutService } from '@weplanx/ngx/layout';

@Injectable()
export class AppService {
  /**
   * 刷新资源
   */
  readonly refresh$: Subject<undefined> = new Subject<undefined>();
  browserRefresh = true;

  constructor(private http: HttpClient, private config: WpxConfig, private layout: WpxLayoutService) {}

  /**
   * 登录鉴权
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/login`, {
      username,
      password
    });
  }

  /**
   * 验证鉴权
   */
  verify(): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/verify`, {});
  }

  /**
   * 获取验证
   */
  code(): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/code`, {});
  }

  /**
   * 刷新令牌
   */
  refreshToken(code: string): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/refresh_token`, {
      code
    });
  }

  /**
   * 注销鉴权
   */
  logout(): Observable<boolean> {
    return this.http.post(`${this.config.baseUrl}/logout`, {}).pipe(map((v: any) => !v.code));
  }

  /**
   * 获取页面数据
   */
  pages(): Observable<any> {
    return this.http
      .post(`${this.config.baseUrl}/pages`, {})
      .pipe(switchMap(v => this.layout.setPages(v as APIResponse<Page[]>)));
  }

  /**
   * 刷新资源
   */
  refresh(): void {
    this.refresh$.next(undefined);
  }
}

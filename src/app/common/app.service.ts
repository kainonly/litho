import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitConfig } from 'ngx-bit';

@Injectable()
export class AppService {
  /**
   * 内容节点
   */
  readonly content: AsyncSubject<ElementRef> = new AsyncSubject();
  /**
   * 刷新导航目录状态
   */
  readonly refreshMenu = new Subject();
  /**
   * 鉴权地址
   */
  private authURL: string;

  constructor(private http: HttpClient, private config: BitConfig) {
    this.authURL = `${config.baseUrl}auth`;
  }

  /**
   * 登录
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authURL, {
      username,
      password
    });
  }

  /**
   * 验证鉴权状态
   */
  verify(): Observable<any> {
    return this.http.get(this.authURL);
  }

  /**
   * 登出
   */
  logout(): Observable<boolean> {
    return this.http.delete(this.authURL).pipe(map((v: any) => !v.error));
  }

  /**
   * 通知刷新导航目录
   */
  refreshMenuStart(): void {
    this.refreshMenu.next(1);
  }
}

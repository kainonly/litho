import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WpxConfig } from '@weplanx/ngx';
import { Page, PageNodes } from '@weplanx/ngx/layout';

@Injectable()
export class AppService {
  /**
   * 刷新资源
   */
  readonly refresh$: Subject<undefined> = new Subject<undefined>();
  browserRefresh = true;

  constructor(private http: HttpClient, private config: WpxConfig) {}

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
    return this.http.post(`${this.config.baseUrl}/refresh`, {
      code
    });
  }

  /**
   * 注销鉴权
   */
  logout(): Observable<boolean> {
    return this.http.post(`${this.config.baseUrl}/logout`, {}).pipe(map((v: any) => !v.error));
  }

  /**
   * 获取页面数据
   */
  pages(): Observable<PageNodes> {
    return this.http.post(`${this.config.baseUrl}/pages`, {}).pipe(
      map((v: Record<string, any>) => {
        const map: Record<string, Page> = {};
        const dict: Record<string, Page> = {};
        const nodes: Page[] = [];
        for (const x of v.data) {
          map[x._id] = x;
          x.children = [];
          if (x.parent === 'root') {
            x.fragments = [x.fragment];
            nodes.push(x);
          } else {
            if (map.hasOwnProperty(x.parent)) {
              x.fragments = [...map[x.parent].fragments, x.fragment];
              map[x.parent].children.push(x);
            }
          }
          x.level = x.fragments.length;
          dict[x.fragments.join('/')] = x;
        }
        return <PageNodes>{
          dict,
          nodes
        };
      })
    );
  }

  /**
   * 刷新资源
   */
  refresh(): void {
    this.refresh$.next(undefined);
  }
}

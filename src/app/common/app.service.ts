import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitConfig } from 'ngx-bit';
import { ID, Resource, Resources } from 'ngx-bit/router';

@Injectable()
export class AppService {
  /**
   * 刷新资源
   */
  readonly refresh$: Subject<undefined> = new Subject<undefined>();
  browserRefresh = true;

  constructor(private http: HttpClient, private config: BitConfig) {}

  /**
   * 登录鉴权
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.config.baseUrl}auth`, {
      username,
      password
    });
  }

  /**
   * 验证鉴权
   */
  verify(): Observable<any> {
    return this.http.get(`${this.config.baseUrl}auth`);
  }

  code(): Observable<any> {
    return this.http.get(`${this.config.baseUrl}code`);
  }

  refreshToken(code: string): Observable<any> {
    return this.http.put(`${this.config.baseUrl}auth`, {
      code
    });
  }

  /**
   * 注销鉴权
   */
  logout(): Observable<boolean> {
    return this.http.delete(`${this.config.baseUrl}auth`).pipe(map((v: any) => !v.error));
  }

  /**
   * 获取资源数据
   */
  resources(): Observable<Resources> {
    return this.http.get(`${this.config.baseUrl}resource`).pipe(
      map((result: any) => {
        const navs: Record<string, any>[] = [];
        const data: Record<ID, Resource> = {};
        const dict: Record<string, ID> = {};
        for (const x of result) {
          data[x.id] = x;
          if (!x.nav) {
            continue;
          }
          if (x.pid === 0) {
            x.url = [x.fragment];
            navs.push(x);
          } else {
            if (data.hasOwnProperty(x.pid)) {
              if (!x.hasOwnProperty('url')) {
                x.url = [...data[x.pid].url];
              }
              x.url.push(x.fragment);
              if (!data[x.pid].hasOwnProperty('children')) {
                data[x.pid].children = [];
              }
              data[x.pid].children.push(x);
            }
          }
          dict[x.url.join('/')] = x.id;
        }
        return <Resources>{
          navs,
          data,
          dict
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

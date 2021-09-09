import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitConfig } from 'ngx-bit';
import { Resources, ResourceStruct } from 'ngx-bit/router';

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

  code(): Observable<any> {
    return this.http.post(`${this.config.baseUrl}/code`, {});
  }

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
   * 获取资源数据
   */
  resources(): Observable<Resources> {
    return this.http.post(`${this.config.baseUrl}/resource`, {}).pipe(
      map((result: any) => {
        const navs: ResourceStruct[] = [];
        const dict: Record<string, ResourceStruct> = {};
        for (const x of result.data) {
          dict[x.key] = x;
          if (!x.nav) {
            continue;
          }
          if (x.parent === 'root') {
            x.fragments = [x.key];
            navs.push(x);
          } else {
            if (dict.hasOwnProperty(x.parent)) {
              x.fragments = [...dict[x.parent].fragments, x.key];
              if (!dict[x.parent].hasOwnProperty('children')) {
                dict[x.parent].children = [];
              }
              dict[x.parent].children.push(x);
            }
          }
        }
        return <Resources>{
          navs,
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

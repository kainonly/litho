import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { resource } from '@common/data';
import { Resources, Resource } from '@common/types';
import { BitConfig } from 'ngx-bit';

@Injectable()
export class AppService {
  /**
   * 鉴权地址
   */
  private authURL: string;
  /**
   * 刷新资源
   */
  readonly refresh$: Subject<undefined> = new Subject<undefined>();

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
   * 获取资源数据
   */
  resources(): Observable<any> {
    return of(resource).pipe(
      map(data => {
        const navs: Record<string, any>[] = [];
        const dict: Record<string, Resource> = {};
        const paths: Record<string, number> = {};
        for (const x of data) {
          dict[x.id] = x;
          if (!x.nav) {
            continue;
          }
          if (x.pid === 0) {
            x.url = [x.fragment];
            navs.push(x);
          } else {
            if (dict.hasOwnProperty(x.pid)) {
              if (!x.hasOwnProperty('url')) {
                x.url = [...dict[x.pid].url];
              }
              x.url.push(x.fragment);
              if (!dict[x.pid].hasOwnProperty('children')) {
                dict[x.pid].children = [];
              }
              dict[x.pid].children.push(x);
            }
          }
          paths[x.url.join('/')] = x.id;
        }
        return { navs, dict, paths } as Resources;
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

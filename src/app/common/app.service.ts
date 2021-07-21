import { ElementRef, Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api, BitService } from 'ngx-bit';

@Injectable()
export class AppService {
  private api: Api;
  /**
   * 内容节点
   */
  readonly content: AsyncSubject<ElementRef> = new AsyncSubject();

  constructor(private bit: BitService) {
    this.api = bit.api('main');
  }

  /**
   * 登录
   */
  login(username: string, password: string): Observable<any> {
    return this.api.send(`login`, {
      username,
      password
    });
  }

  /**
   * 登出
   */
  logout(): Observable<boolean> {
    return this.api.send(`logout`).pipe(map((v: any) => !v.error));
  }

  /**
   * 获取路由资源
   */
  resource(): Observable<any> {
    return this.api.send(`resource`).pipe(
      map((v: any) => {
        const resource: Record<string, any> = {};
        const router: Record<string, any> = {};
        const nav: any = [];

        if (!v.error) {
          for (const x of v.data) {
            resource[x.key] = x;
            if (x.router === 1 || x.router === true) {
              router[x.key] = x;
            }
          }
          for (const x of v.data) {
            if (!x.nav) {
              continue;
            }
            if (x.parent === 'origin') {
              nav.push(x);
            } else {
              const parent = x.parent;
              if (resource.hasOwnProperty(parent)) {
                const rows = resource[parent];
                if (!rows.hasOwnProperty('children')) {
                  rows.children = [];
                }
                x.parentNode = rows;
                rows.children.push(x);
              }
            }
          }
          return { resource, nav, router };
        } else {
          return {};
        }
      })
    );
  }
}

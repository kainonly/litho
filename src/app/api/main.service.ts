import {Injectable} from '@angular/core';
import {HttpService} from 'ngx-bit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class MainService {
  constructor(private http: HttpService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.req('main/login', {
      username: username,
      password: password
    });
  }

  check(): Observable<boolean> {
    return this.http.req('main/check');
  }

  menu(): Observable<any> {
    return this.http.req('main/menu').pipe(map(res => {
      const refer: Map<number, any> = new Map();
      const route: Map<string, any> = new Map();
      const nav = [];
      if (!res.error) {
        for (const x of res.data) {
          refer.set(x.id, x);
          route.set(x.routerlink, x);
        }
        for (const x of res.data) {
          if (!x.nav) {
            continue;
          }
          if (x.parent === 0) {
            nav.push(x);
          } else {
            const parent = x.parent;
            if (refer.has(parent)) {
              const rows = refer.get(parent);
              if (!rows.hasOwnProperty('children')) {
                rows.children = [];
              }
              rows.children.push(x);
            }
          }
        }
      }
      return {
        menu: refer,
        nav: nav,
        route: route
      };
    }));
  }
}

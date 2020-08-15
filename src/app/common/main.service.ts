import { Injectable } from '@angular/core';
import { BitHttpService } from 'ngx-bit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MainService {
  private model = 'main';

  constructor(
    private http: BitHttpService
  ) {
  }

  /**
   * User Login
   */
  login(username: string, password: string): Observable<any> {
    return this.http.req(this.model + '/login', {
      username,
      password
    });
  }

  /**
   * User Logout
   */
  logout(): Observable<boolean> {
    return this.http.req(this.model + '/logout').pipe(
      map(res => !res.error)
    );
  }

  /**
   * Token Verify
   */
  verify(): Observable<boolean> {
    return this.http.req(this.model + '/verify');
  }

  /**
   * Get Resource
   */
  resource(): Observable<any> {
    return this.http.req(this.model + '/resource').pipe(
      map(res => {
        const resource: Map<string, any> = new Map<string, any>();
        const router: Map<string, any> = new Map<string, any>();
        const nav: any = [];

        if (!res.error) {
          for (const x of res.data) {
            resource.set(x.key, x);
            if (x.router === 1) {
              router.set(x.key, x);
            }
          }
          for (const x of res.data) {
            if (!x.nav) {
              continue;
            }

            if (x.parent === 'origin') {
              nav.push(x);
            } else {
              const parent = x.parent;
              if (resource.has(parent)) {
                const rows = resource.get(parent);
                if (!rows.hasOwnProperty('children')) {
                  rows.children = [];
                }
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

  /**
   * Get Profile Information
   */
  information(): Observable<any> {
    return this.http.req(this.model + '/information').pipe(
      map(res => !res.error ? res.data : {})
    );
  }

  /**
   * Update Profile
   */
  update(data: any): Observable<any> {
    return this.http.req(this.model + '/update', data);
  }
}

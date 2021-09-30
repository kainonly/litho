import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { last, map, retry, take, takeLast, takeUntil, throttleTime } from 'rxjs/operators';

import { AppService } from '@common/app.service';
import { WpxLayoutService, WpxPagesService } from '@weplanx/ngx/layout';

@Injectable({ providedIn: 'root' })
export class AppDynamic implements CanActivate {
  constructor(private wpxLayout: WpxLayoutService, private wpxPages: WpxPagesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.wpxLayout.pages.pipe(
      map(v => {
        console.log(v);
        const path = route.url.join('/');
        if (!!v.dict) {
          if (v.dict.hasOwnProperty(path)) {
            this.wpxPages.dynamic(v.dict[path]);
          } else {
            // TODO: 跳转404
          }
        }
        return true;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AppService } from '@common/app.service';
import { WpxLayoutService, WpxPagesService } from '@weplanx/ngx/layout';

@Injectable({ providedIn: 'root' })
export class AppDynamic implements CanActivate {
  constructor(private wpxLayout: WpxLayoutService, private wpxPages: WpxPagesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.wpxLayout.pages.subscribe(data => {
      if (!!data.dict) {
        this.wpxPages.dynamic(data.dict[route.url.join('/')]);
      }
    });
    return true;
  }
}

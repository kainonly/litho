import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { WpxLayoutService } from '@weplanx/ngx/layout';

@Injectable({ providedIn: 'root' })
export class WpxLayoutActivated implements CanActivateChild {
  constructor(private wpxLayout: WpxLayoutService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.wpxLayout.reset();
    if (childRoute.params.hasOwnProperty('pages')) {
      this.wpxLayout.activated = childRoute.params.pages.split(',');
    } else {
      this.wpxLayout.activated = state.url.split('/').splice(2);
    }
    return true;
  }
}

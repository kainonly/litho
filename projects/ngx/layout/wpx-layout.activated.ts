import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { WpxLayoutService } from '@weplanx/ngx/layout';

@Injectable({ providedIn: 'root' })
export class WpxLayoutActivated implements CanActivateChild {
  constructor(private wpxLayout: WpxLayoutService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.wpxLayout.reset();
    if (childRoute.params.hasOwnProperty('fragments')) {
      this.wpxLayout.activated = childRoute.params.fragments.split(',');
    } else {
      const path = state.url.match(/\/pages\/([\w|\/]+);?/)!;
      this.wpxLayout.activated = path[1].split('/');
    }
    return true;
  }
}

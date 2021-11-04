import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { WpxService } from './wpx.service';

@Injectable({ providedIn: 'root' })
export class WpxActivated implements CanActivateChild {
  constructor(private wpx: WpxService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.wpx.layout = {};
    if (childRoute.params.hasOwnProperty('fragments')) {
      this.wpx.fragments = childRoute.params.fragments.split(',');
    } else {
      const path = state.url.match(/\/pages\/([\w|\/]+);?/)!;
      this.wpx.fragments = path[1].split('/');
    }
    return true;
  }
}

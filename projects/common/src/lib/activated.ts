import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';

import { WpxService } from './wpx.service';

@Injectable({ providedIn: 'root' })
export class WpxActivated implements CanActivateChild {
  constructor(private wpx: WpxService) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot): true {
    this.wpx.pageId = childRoute.params['pageId'];
    return true;
  }
}

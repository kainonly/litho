import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CommonService } from '@common/common.service';
import { WpxService } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class CommonGuard implements CanActivate {
  private refreshTokenSubscription!: Subscription;

  constructor(private common: CommonService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.common.verify().pipe(
      map(res => {
        if (res.status !== 200) {
          this.router.navigateByUrl('/login').then(_ => {});
        }
        this.common.getUser().subscribe(data => {
          this.common.user = data;
        });
        // this.wpx.getUpload().subscribe(() => {});
        if (this.refreshTokenSubscription) {
          this.refreshTokenSubscription.unsubscribe();
        }
        this.refreshTokenSubscription = timer(0, 3200 * 1000)
          .pipe(switchMap(() => this.common.refreshToken()))
          .subscribe(() => {});
        return true;
      })
    );
  }
}

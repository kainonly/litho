import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WpxService } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  private refreshTokenSubscription!: Subscription;

  constructor(private wpx: WpxService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.wpx.verify().pipe(
      map(res => {
        if (res.status !== 200) {
          this.router.navigateByUrl('/login');
        }
        // this.wpx.getUser().subscribe(data => {
        //   this.wpx.user = data;
        // });
        // this.wpx.getUpload().subscribe(() => {});
        if (this.refreshTokenSubscription) {
          this.refreshTokenSubscription.unsubscribe();
        }
        this.refreshTokenSubscription = timer(0, 3200 * 1000)
          .pipe(switchMap(() => this.wpx.refreshToken()))
          .subscribe(() => {});
        return true;
      })
    );
  }
}

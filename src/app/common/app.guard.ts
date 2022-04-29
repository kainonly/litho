import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, Observable, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WpxService } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  private refreshTokenSubscription!: Subscription;

  constructor(private wpx: WpxService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.wpx.verify().pipe(
      map(res => {
        if (res.status !== 204) {
          this.router.navigateByUrl('/login');
        }
        if (this.refreshTokenSubscription) {
          this.refreshTokenSubscription.unsubscribe();
        }
        this.autoRefreshToken();
        this.wpx.loadUpload().subscribe(() => {});
        this.wpx.getUser().subscribe(() => {});
        return true;
      })
    );
  }

  /**
   * 每 300 秒周期更新 Token
   * @private
   */
  private autoRefreshToken(): void {
    this.refreshTokenSubscription = timer(0, 240000)
      .pipe(
        filter(() => !!this.wpx.user),
        switchMap(() =>
          this.wpx.code().pipe(
            map(v => {
              return v.code;
            })
          )
        ),
        switchMap(code => this.wpx.refreshToken(code))
      )
      .subscribe(() => {});
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, Observable, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@common/app.service';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  private refreshTokenSubscription!: Subscription;

  constructor(private app: AppService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.app.verify().pipe(
      map(res => {
        if (res.status !== 204) {
          this.router.navigateByUrl('/login');
        }
        if (this.refreshTokenSubscription) {
          this.refreshTokenSubscription.unsubscribe();
        }
        this.autoRefreshToken();
        return true;
      })
    );
  }

  /**
   * 每 300 秒周期更新 Token
   * @private
   */
  private autoRefreshToken(): void {
    this.refreshTokenSubscription = timer(0, 300000)
      .pipe(
        filter(() => !!this.app.user),
        switchMap(() =>
          this.app.code().pipe(
            map(v => {
              return v.code;
            })
          )
        ),
        switchMap(code => this.app.refreshToken(code))
      )
      .subscribe(() => {});
  }
}

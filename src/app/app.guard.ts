import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@app';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  private refreshTokenSubscription!: Subscription;

  constructor(private app: AppService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.app.verify().pipe(
      map(res => {
        if (res.status !== 200) {
          this.app.user = undefined;
          this.app.project = undefined;
          this.router.navigateByUrl('/login').then(_ => {});
        }
        this.app.getUser().subscribe(() => {});
        if (this.refreshTokenSubscription) {
          this.refreshTokenSubscription.unsubscribe();
        }
        this.refreshTokenSubscription = timer(0, 3200 * 1000)
          .pipe(switchMap(() => this.app.refreshToken()))
          .subscribe(() => {});
        return true;
      })
    );
  }
}

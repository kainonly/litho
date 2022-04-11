import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, Observable, Subscription, takeUntil, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@common/app.service';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  private refreshToken$!: Subscription;

  constructor(private app: AppService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.app.verify().pipe(
      map(res => {
        if (res.status !== 204) {
          this.router.navigateByUrl('/login');
        }
        if (this.refreshToken$) {
          this.refreshToken$.unsubscribe();
        }
        this.autoRefreshToken(0);
        return true;
      })
    );
  }

  private autoRefreshToken(time = 300000): void {
    this.refreshToken$ = timer(time)
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
      .subscribe(() => {
        this.autoRefreshToken();
      });
  }
}

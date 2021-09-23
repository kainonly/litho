import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from '@common/app.service';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  constructor(private app: AppService, private router: Router) {}

  canActivate(): Observable<any> {
    return of(true);
    // return this.app.verify().pipe(
    //   map((res: any) => {
    //     if (res.error) {
    //       this.router.navigateByUrl('/login');
    //     }
    //     return true;
    //   })
    // );
  }
}

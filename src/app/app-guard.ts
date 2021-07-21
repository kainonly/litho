import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api, BitService } from 'ngx-bit';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  api: Api;

  constructor(private bit: BitService, private router: Router) {
    this.api = bit.api('main');
  }

  canActivate(): Observable<any> {
    return this.api.send(`verify`).pipe(
      map((res: any) => {
        if (res.error) {
          this.router.navigateByUrl('/login');
        }
        return true;
      })
    );
  }
}

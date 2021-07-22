import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitConfig } from 'ngx-bit';

@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {
  constructor(private config: BitConfig, private http: HttpClient, private router: Router) {}

  canActivate(): Observable<any> {
    return this.http.get(`${this.config.baseUrl}verify`).pipe(
      map((res: any) => {
        if (res.error) {
          this.router.navigateByUrl('/login');
        }
        return true;
      })
    );
  }
}

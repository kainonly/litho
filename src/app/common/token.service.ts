import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from '@common/main.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenService implements CanActivate {
  constructor(
    private mainService: MainService,
    private router: Router
  ) {
  }

  canActivate() {
    return this.mainService.verify().pipe(
      map((res: any) => {
        if (res.error) {
          this.router.navigateByUrl('/login');
        }
        return true;
      })
    );
  }
}

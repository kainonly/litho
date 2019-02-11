import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {MainService} from '../api/main.service';

@Injectable()
export class Auth implements CanActivate {
  constructor(private main: MainService,
              private router: Router) {
  }

  canActivate() {
    return false;
    // return this.main.check().pipe(
    //   map((res: any) => {
    //     if (res.error) {
    //       this.router.navigateByUrl('/login');
    //     }
    //     return true;
    //   })
    // );
  }
}

import { Component, OnInit } from '@angular/core';
import { BitHttpService, BitService } from 'ngx-bit';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(
    private bit: BitService,
    private http: BitHttpService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bit.setupLocale();
    this.bit.registerLocales(import('./app.language'));
    this.http.setupInterceptor(
      map(res => {
        if (res.error) {
          switch (res.msg) {
            case 'refresh token verification expired':
              this.notification.warning(this.bit.l.auth, this.bit.l.authInvalid, {
                nzKey: 'authInvalid'
              });
              this.router.navigateByUrl('/login');
              break;
          }
        }
        return res;
      })
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@common/app.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public app: AppService, private router: Router, private notification: NzNotificationService) {}

  logout(): void {
    // this.app.logout().subscribe(() => {
    //   this.router.navigateByUrl('/login');
    //   this.notification.info('认证状态', '您已退出管理系统');
    // });
  }
}

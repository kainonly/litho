import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { CenterComponent } from '@common/center/center.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  constructor(public app: AppService, private router: Router, private drawer: NzDrawerService) {}

  center(): void {
    this.drawer.create<CenterComponent, { value: string }, string>({
      nzTitle: '个人中心',
      nzWidth: '736px',
      nzContent: CenterComponent,
      nzContentParams: {}
    });
  }

  /**
   * 注销登录
   */
  logout(): void {
    this.app.logout().subscribe(() => {
      this.app.user = undefined;
      this.router.navigateByUrl('/login');
    });
  }
}

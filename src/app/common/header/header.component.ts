import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProfileComponent } from '@common/profile/profile.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  constructor(public app: AppService, private router: Router, private drawer: NzDrawerService) {}

  profile(): void {
    this.drawer.create<ProfileComponent, { value: string }, string>({
      nzTitle: '个人中心',
      nzWidth: '960px',
      nzContent: ProfileComponent,
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

import { Component, Input, TemplateRef } from '@angular/core';
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
  @Input() breadcrumb!: TemplateRef<any>;

  constructor(public app: AppService, private router: Router, private drawer: NzDrawerService) {}

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

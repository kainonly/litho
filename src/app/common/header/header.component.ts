import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  constructor(public app: AppService, private router: Router) {}

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

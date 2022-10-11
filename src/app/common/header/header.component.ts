import { Component, ComponentRef, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  @Input() breadcrumb!: TemplateRef<any>;

  constructor(public app: AppService, public wpx: WpxService, private router: Router) {}

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

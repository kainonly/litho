import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { ProjectsComponent } from '@common/projects/projects.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  @Input() breadcrumb!: TemplateRef<any>;

  constructor(public app: AppService, private router: Router, private drawer: NzDrawerService) {}

  openProjects(extra: TemplateRef<any>): void {
    this.drawer.create({
      nzTitle: '项目列表',
      nzExtra: extra,
      nzWidth: 736,
      nzPlacement: 'left',
      nzOffsetY: 45,
      nzMaskClosable: false,

      nzContent: ProjectsComponent
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

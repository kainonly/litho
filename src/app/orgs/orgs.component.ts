import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-orgs',
  template: `
    <nz-layout class="main">
      <app-toolbar></app-toolbar>
      <nz-layout>
        <ng-template #breadcrumbTpl>
          <nz-breadcrumb nzAutoGenerate>
            <nz-breadcrumb-item>
              <a [routerLink]="['/']"><span nz-icon nzType="home"></span> 首页</a>
            </nz-breadcrumb-item>
          </nz-breadcrumb>
        </ng-template>
        <app-header [breadcrumb]="breadcrumbTpl">
          <ul nz-menu nzMode="horizontal">
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.namespace, 'orgs', 'roles']">
              <span nz-icon nzType="partition"></span>
              权限组
            </li>
            <li nz-menu-item nzMatchRouter [routerLink]="['/', app.namespace, 'orgs', 'users']">
              <span nz-icon nzType="team"></span>
              团队成员
            </li>
          </ul>
        </app-header>
        <nz-layout class="frame">
          <nz-content>
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class OrgsComponent {
  constructor(public app: AppService) {}
}

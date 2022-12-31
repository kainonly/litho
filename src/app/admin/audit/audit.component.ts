import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-audit',
  template: `
    <nz-row style="background: #fff">
      <nz-col nzFlex="80px">
        <nz-tabset style="height: 100%;padding: 12px 0 12px 12px" nzTabPosition="left" nzLinkRouter nzHideAll>
          <nz-tab>
            <a *nzTabLink nz-tab-link [routerLink]="['/', 'admin', 'audit', 'access_logs']">操作记录</a>
          </nz-tab>
          <nz-tab>
            <a *nzTabLink nz-tab-link [routerLink]="['/', 'admin', 'audit', 'login_logs']">登录记录</a>
          </nz-tab>
        </nz-tabset>
      </nz-col>
      <nz-col nzFlex="auto">
        <router-outlet></router-outlet>
      </nz-col>
    </nz-row>
  `
})
export class AuditComponent {}

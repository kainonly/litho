import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppService } from '@app';
import { NavComponent } from '@common/components/nav/nav.component';
import { Project } from '@common/models/project';
import { ShareModule } from '@common/share.module';
import { AnyDto } from '@weplanx/ng';

@Component({
  standalone: true,
  imports: [ShareModule, NavComponent],
  selector: 'app-index',
  template: `
    <nz-layout style="height: 100%">
      <nz-header class="nav">
        <ng-template #breadcrumbsRef>
          <nz-breadcrumb nzAutoGenerate>
            <nz-breadcrumb-item>{{ data.name }}</nz-breadcrumb-item>
          </nz-breadcrumb>
        </ng-template>
        <app-nav [breadcrumbs]="breadcrumbsRef"></app-nav>
      </nz-header>
      <nz-layout>
        <nz-sider nzWidth="240px" nzTheme="light">
          <ul nz-menu style="border: none">
            <li nz-menu-item nzMatchRouter routerLink="overview">
              <span nz-icon nzType="project" nzTheme="outline"></span>
              <span>Overview</span>
            </li>
            @if (data.kind === 'cms') {
              <li nz-menu-item nzMatchRouter routerLink="builders">
                <span nz-icon nzType="layout" nzTheme="outline"></span>
                <span>Builders</span>
              </li>
            }
            <li nz-menu-item nzMatchRouter routerLink="workflows">
              <span nz-icon nzType="schedule" nzTheme="outline"></span>
              <span>Workflows</span>
            </li>
            <li nz-menu-item nzMatchRouter routerLink="queues">
              <span nz-icon nzType="pull-request" nzTheme="outline"></span>
              <span>Queues</span>
            </li>
          </ul>
        </nz-sider>
        <nz-layout style="overflow: hidden auto">
          <nz-content>
            <router-outlet></router-outlet>
          </nz-content>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `
})
export class IndexComponent implements OnInit, OnDestroy {
  data!: AnyDto<Project>;

  constructor(public app: AppService) {}

  ngOnInit(): void {
    this.data = this.app.contextData!;
  }

  ngOnDestroy(): void {
    this.app.destoryContext();
  }
}

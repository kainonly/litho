import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@app';
import { ProjectsService } from '@common/services/projects.service';

import { DesignService } from './design/design.service';

@Component({
  selector: 'app-index',
  template: `
    <nav *ngIf="app.project as v" class="toolbar">
      <ul nz-menu nzMode="vertical">
        <li
          nz-menu-item
          nzMatchRouter
          [routerLink]="['/', v.namespace, 'design']"
          (click)="design.toggleCollapsed()"
          nz-tooltip="打开 / 隐藏"
          i18n-nz-tooltip
          nzTooltipPlacement="right"
        >
          <span nz-icon [nzType]="this.design.collapsed ? 'menu-fold' : 'menu-unfold'"></span>
        </li>
        <li
          nz-menu-item
          nzMatchRouter
          [routerLink]="['/', v.namespace, 'datasource']"
          nz-tooltip="数据源"
          nzTooltipPlacement="right"
        >
          <span nz-icon nzType="database"></span>
        </li>
        <li
          nz-menu-item
          nzMatchRouter
          [routerLink]="['/', v.namespace, 'resources']"
          nz-tooltip="资源"
          nzTooltipPlacement="right"
        >
          <span nz-icon nzType="inbox"></span>
        </li>
        <li
          nz-menu-item
          nzMatchRouter
          [routerLink]="['/', v.namespace, 'orgs']"
          nz-tooltip="组织"
          nzTooltipPlacement="right"
        >
          <span nz-icon nzType="apartment"></span>
        </li>
        <li
          nz-menu-item
          nzMatchRouter
          [routerLink]="['/', v.namespace, 'schedules']"
          nz-tooltip="调度"
          nzTooltipPlacement="right"
        >
          <i nz-icon nzType="schedule"></i>
        </li>
        <li
          nz-menu-item
          nzMatchRouter
          [routerLink]="['/', v.namespace, 'logsystem']"
          nz-tooltip="日志"
          nzTooltipPlacement="right"
        >
          <span nz-icon nzType="history"></span>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public app: AppService,
    private projects: ProjectsService,
    public design: DesignService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(v => v.get('namespace')),
        switchMap(namespace => this.projects.findOne({ namespace }))
      )
      .subscribe(v => {
        this.app.project = v;
      });
  }

  ngOnDestroy(): void {
    this.app.project = undefined;
  }
}

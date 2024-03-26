import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppService } from '@app';
import { NavComponent } from '@common/components/nav/nav.component';
import { Project } from '@common/models/project';
import { ShareModule } from '@common/share.module';
import { AnyDto } from '@weplanx/ng';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  standalone: true,
  imports: [ShareModule, NzBreadCrumbModule, NavComponent],
  selector: 'app-index',
  templateUrl: './index.component.html'
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

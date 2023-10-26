import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Project } from '@common/models/project';
import { AnyDto } from '@weplanx/ng';

@Component({
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

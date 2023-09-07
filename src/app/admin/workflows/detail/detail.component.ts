import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';

import { Project } from '@common/models/project';
import { Schedule } from '@common/models/schedule';
import { State, Workflow } from '@common/models/workflow';
import { WorkflowsService } from '@common/services/workflows.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-workflows-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input({ required: true }) doc!: AnyDto<Workflow>;
  @Input({ required: true }) project!: AnyDto<Project>;
  @Input({ required: true }) schedule!: AnyDto<Schedule>;

  state?: State;
  private refresh!: Subscription;

  constructor(
    private workflows: WorkflowsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.refresh = timer(0, 1000)
      .pipe(switchMap(() => this.workflows.state(this.doc._id)))
      .subscribe(data => {
        this.state = data;
      });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }

  sync(): void {
    this.workflows.sync(this.doc._id).subscribe(() => {
      this.message.success(`触发事件已同步`);
    });
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';

import { Project } from '@common/models/project';
import { Schedule, ScheduleState } from '@common/models/schedule';
import { Workflow } from '@common/models/workflow';
import { SchedulesService } from '@common/services/schedules.service';
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

  state?: ScheduleState;
  private refresh!: Subscription;

  constructor(
    private workflows: WorkflowsService,
    private schedules: SchedulesService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.schedules.findById(this.doc.schedule!.schedule_id).subscribe(schedule => {
      this.refresh = timer(0, 5000)
        .pipe(switchMap(() => this.schedules.state(schedule.node, this.doc._id)))
        .subscribe(data => {
          this.state = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.refresh?.unsubscribe();
  }

  sync(): void {
    this.workflows.sync(this.doc._id).subscribe(() => {
      this.message.success(`触发事件已同步`);
    });
  }
}

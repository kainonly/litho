import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';

import { States, Workflow } from '@common/models/workflow';
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

  statesDict: States = {};
  private refresh!: Subscription;

  constructor(private workflows: WorkflowsService) {}

  ngOnInit(): void {
    this.refresh = timer(0, 1000)
      .pipe(switchMap(() => this.workflows.states([this.doc._id])))
      .subscribe(data => {
        this.statesDict = data;
      });
  }

  ngOnDestroy(): void {
    this.refresh.unsubscribe();
  }
}

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, Subscription, switchMap, timer } from 'rxjs';

import { Endpoint, ScheduleState } from '@common/models/endpoint';
import { Workflow } from '@common/models/workflow';
import { EndpointsService } from '@common/services/endpoints.service';
import { WorkflowsService } from '@common/services/workflows.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LogsComponent } from '../logs/logs.component';

@Component({
  selector: 'app-index-workflows-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit, OnDestroy {
  @Input({ required: true }) doc!: AnyDto<Workflow>;
  @Input({ required: true }) updated!: () => void;
  index = 0;

  state?: ScheduleState;
  private refresh!: Subscription;

  form!: FormGroup;
  tips = {
    ref: {
      default: {
        required: `服务节点不能为空`
      }
    }
  };
  scheduleText$ = new BehaviorSubject<string>('');
  scheduleItems: AnyDto<Endpoint>[] = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private endpoints: EndpointsService,
    private workflows: WorkflowsService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.endpoints.findById(this.doc.schedule!.ref).subscribe(data => {
      this.refresh = timer(0, 5000)
        .pipe(switchMap(() => this.endpoints.scheduleState(data.schedule!.node, this.doc._id)))
        .subscribe(data => {
          this.state = data;
        });
    });
    switch (this.doc.kind) {
      case 'schedule':
        this.form = this.fb.group({
          ref: ['', [Validators.required]],
          status: [true, [Validators.required]],
          jobs: this.fb.array([])
        });
        if (this.doc.schedule) {
          this.doc.schedule.jobs.forEach(v => this.appendJob(v));
          this.form.patchValue(this.doc.schedule);
        }
        this.scheduleText$
          .asObservable()
          .pipe(debounceTime(500))
          .subscribe(v => {
            this.getSchedules(v);
          });
        break;
    }
  }

  ngOnDestroy(): void {
    this.refresh?.unsubscribe();
  }

  sync(): void {
    this.workflows.sync(this.doc._id).subscribe(() => {
      this.message.success(`触发事件已同步`);
    });
  }

  openLogs(index: number): void {
    this.drawer.create({
      nzClosable: false,
      nzContent: LogsComponent,
      nzPlacement: 'bottom',
      nzContentParams: {
        doc: this.doc,
        index
      },
      nzHeight: 640
    });
  }

  getSchedules(value: string): void {
    this.endpoints.find({ kind: 'schedule', name: { $regex: value } }).subscribe(({ data }) => {
      this.scheduleItems = [...data];
    });
  }

  get jobs(): FormArray {
    return this.form.get('jobs') as FormArray;
  }

  appendJob(value?: Any): void {
    const f = this.fb.group({
      mode: ['HTTP', [Validators.required]],
      spec: ['0 */5 * * * *', [Validators.required]],
      option: this.fb.group({
        method: ['POST', [Validators.required]],
        url: ['', [Validators.required]],
        headers: [],
        body: []
      })
    });
    this.jobs.push(f);
    if (value) {
      f.patchValue(value);
    }
  }

  removeJob(index: number): void {
    this.jobs.removeAt(index);
  }

  sort(event: CdkDragDrop<string[]>, data: FormArray): void {
    moveItemInArray(data.controls, event.previousIndex, event.currentIndex);
    data.controls.forEach((value, index) => data.setControl(index, value));
  }

  submit(data: Any): void {
    this.workflows
      .updateById(
        this.doc._id,
        {
          $set: { schedule: data }
        },
        {
          xdata: {
            '$set->schedule->ref': 'oid'
          }
        }
      )
      .subscribe(() => {
        this.message.success(`数据更新成功`);
        this.updated();
        this.sync();
      });
  }
}

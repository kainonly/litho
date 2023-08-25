import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { Schedule } from '@common/models/schedule';
import { Workflow } from '@common/models/workflow';
import { SchedulesService } from '@common/services/schedules.service';
import { WorkflowsService } from '@common/services/workflows.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-workflows-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Workflow>;
  @Input({ required: true }) updated!: () => void;

  form!: FormGroup;
  tips = {
    schedule_id: {
      default: {
        required: `服务节点不能为空`
      }
    }
  };
  schedules$ = new BehaviorSubject<string>('');
  scheduleItems: AnyDto<Schedule>[] = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private schedules: SchedulesService,
    private workflows: WorkflowsService
  ) {}

  ngOnInit(): void {
    switch (this.doc.kind) {
      case 'schedule':
        this.form = this.fb.group({
          schedule_id: ['', [Validators.required]],
          status: [true, [Validators.required]],
          jobs: this.fb.array([])
        });
        if (this.doc.schedule) {
          this.doc.schedule.jobs.forEach(v => this.appendJob(v));
          this.form.patchValue(this.doc.schedule);
        }
        this.schedules$
          .asObservable()
          .pipe(debounceTime(500))
          .subscribe(v => {
            this.getSchedules(v);
          });
        break;
    }
  }

  getSchedules(v: string): void {
    this.schedules.find({ name: { $regex: '^' + v } }).subscribe(({ data }) => {
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
          $set: {
            schedule: data
          }
        },
        {
          xdata: {
            '$set->schedule->schedule_id': 'oid'
          }
        }
      )
      .subscribe(() => {
        this.message.success(`数据更新成功`);
        this.updated();
      });
  }
}

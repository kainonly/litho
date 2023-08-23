import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { Project } from '@common/models/project';
import { Schedule } from '@common/models/schedule';
import { Workflow } from '@common/models/workflow';
import { ProjectsService } from '@common/services/projects.service';
import { SchedulesService } from '@common/services/schedules.service';
import { WorkflowsService } from '@common/services/workflows.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface ModalData {
  doc?: AnyDto<Workflow>;
}

@Component({
  selector: 'app-admin-workflows-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `工作流名称不能为空`
      }
    },
    project: {
      default: {
        required: `所属项目不能为空`
      }
    },
    kind: {
      default: {
        required: `工作流类型不能为空`
      }
    }
  };

  projects$ = new BehaviorSubject<string>('');
  projectItems: AnyDto<Project>[] = [];
  schedules$ = new BehaviorSubject<string>('');
  scheduleItems: AnyDto<Schedule>[] = [];

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: ModalData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private workflows: WorkflowsService,
    private projects: ProjectsService,
    private schedules: SchedulesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      project: ['', [Validators.required]],
      kind: ['schedule', [Validators.required]]
    });
    if (this.data.doc) {
      this.setKindOption(this.data.doc.kind);
      this.form.patchValue({
        name: this.data.doc.name,
        kind: this.data.doc.kind
      });
    } else {
      this.setKindOption('schedule');
    }
    this.form.get('kind')!.valueChanges.subscribe(v => {
      this.form.removeControl('option');
      this.setKindOption(v);
    });
    this.projects$
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(v => {
        this.getProjects(v);
      });
    this.schedules$
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(v => {
        this.getSchedules(v);
      });
  }

  private setKindOption(kind: string): void {
    switch (kind) {
      case 'schedule':
        this.form.addControl(
          'schedule',
          this.fb.group({
            schedule_id: ['', [Validators.required]],
            status: [true, [Validators.required]],
            jobs: this.fb.array([])
          })
        );
        break;
      default:
        this.form.removeControl('schedule');
        break;
    }
  }

  getProjects(v: string): void {
    this.projects.find({ name: { $regex: '^' + v } }).subscribe(({ data }) => {
      this.projectItems = [...data];
    });
  }

  getSchedules(v: string): void {
    this.schedules.find({ name: { $regex: '^' + v } }).subscribe(({ data }) => {
      this.scheduleItems = [...data];
    });
  }

  get jobs(): FormArray {
    return this.form.get('schedule')?.get('jobs') as FormArray;
  }

  appendJob(value?: Any): void {
    this.jobs.push(
      this.fb.group({
        mode: ['', [Validators.required]],
        spec: ['', [Validators.required]],
        option: this.fb.group({
          url: [],
          headers: [],
          body: []
        })
      })
    );
  }

  removeJob(index: number): void {
    this.jobs.removeAt(index);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data.config = JSON.stringify(data.config);
    if (!this.data.doc) {
      this.workflows.create(data).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.workflows.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}

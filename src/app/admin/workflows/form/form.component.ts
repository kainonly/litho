import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

import { Project } from '@common/models/project';
import { Workflow } from '@common/models/workflow';
import { ProjectsService } from '@common/services/projects.service';
import { WorkflowsService } from '@common/services/workflows.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
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

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private workflows: WorkflowsService,
    private projects: ProjectsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      project: ['', [Validators.required]],
      kind: ['schedule', [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
    this.projects$
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(v => {
        this.getProjects(v);
      });
  }

  getProjects(v: string): void {
    this.projects.find({ name: { $regex: v } }).subscribe(({ data }) => {
      this.projectItems = [...data];
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.workflows
        .create(data, {
          xdata: { project: 'oid' }
        })
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.workflows
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: { '$set->project': 'oid' }
          }
        )
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}

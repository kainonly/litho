import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AppService } from '@app';
import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface ProjectInput {
  doc?: AnyDto<Project>;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `项目名称不能为空`
      }
    },
    namespace: {
      default: {
        required: `命名空间不能为空`,
        duplicated: `存在重复的定义，命名空间必须是唯一的`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: ProjectInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private projects: ProjectsService,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      namespace: ['', [Validators.required], [this.checkNamespace]],
      kind: [null, [Validators.required]],
      expire: [null],
      secret_id: [''],
      secret_key: [''],
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
      this.form.get('namespace')?.disable();
      this.form.get('kind')?.disable();
    }
  }

  checkNamespace = (control: AbstractControl): Observable<Any> => {
    if (control.value === this.data.doc?.namespace) {
      return of(null);
    }
    return this.projects.existsNamespace(control.value);
  };

  generateSecret(): void {
    this.app.generateSecret().subscribe(data => {
      this.form.patchValue({
        secret_id: data.id,
        secret_key: data.key
      });
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.projects
        .create(data, {
          xdata: {
            expire: 'timestamp'
          }
        })
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.projects
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: {
              '$set->expire': 'timestamp'
            }
          }
        )
        .subscribe(() => {
          this.message.success(`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}

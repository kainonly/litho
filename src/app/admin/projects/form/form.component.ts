import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AppService } from '@app';
import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
  doc?: AnyDto<Project>;
}

@Component({
  selector: 'app-admin-projects-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
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
    public data: FormInput,
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
      secret_id: [''],
      secret_key: [''],
      expire: [null],
      status: [true, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    } else {
      this.generateSecret();
    }
  }

  checkNamespace = (control: AbstractControl): Observable<Any> => {
    if (control.value === this.data.doc?.namespace) {
      return of(null);
    }
    return this.projects.existsNamespace(control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  generateSecret(): void {
    this.app.generateSecret().subscribe(data => {
      this.form.patchValue({
        secret_id: data.id,
        secret_key: data.key
      });
    });
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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { AccTask } from '@common/models/acc-task';
import { AccTasksService } from '@common/services/acc-tasks.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
  doc?: AnyDto<AccTask>;
}

@Component({
  selector: 'app-admin-acc-tasks-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    kind: {
      default: {
        required: `资源种类不能为空`
      }
    },
    source: {
      default: {
        required: `源地址不能为空`
      }
    },
    target: {
      default: {
        required: `目标地址不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private accTasks: AccTasksService,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      kind: ['static', [Validators.required]],
      source: ['', [Validators.required]],
      target: ['', [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

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
      this.accTasks.create(data).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.accTasks.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}

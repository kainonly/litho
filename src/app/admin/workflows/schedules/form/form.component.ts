import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Schedule } from '@common/models/schedule';
import { SchedulesService } from '@common/services/schedules.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
  doc?: AnyDto<Schedule>;
}

@Component({
  selector: 'app-admin-workflows-schedules-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `服务名称不能为空`
      }
    },
    node: {
      default: {
        required: `节点命名不能为空`,
        pattern: `仅允许小写字母、数子、下划线`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private schedules: SchedulesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      node: ['', [Validators.required, Validators.pattern(/[_a-z0-9]+/)]]
    });
    if (this.data.doc) {
      this.form.get('cluster_id')?.disable();
      this.form.patchValue(this.data.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    if (!this.data.doc) {
      this.schedules.create(data).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.schedules.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}

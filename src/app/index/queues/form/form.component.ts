import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Queue } from '@common/models/queue';
import { QueuesService } from '@common/services/queues.service';
import { Any, AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface FormInput {
  doc?: AnyDto<Queue>;
}

@Component({
  selector: 'app-admin-queues-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: `队列名称不能为空`
      }
    },
    subjects: {
      default: {
        required: `队列主题不能为空`
      }
    }
  };
  formatterSec = (value: number): string => `${value} s`;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: FormInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private queues: QueuesService,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      subjects: [[], [Validators.required]],
      description: [''],
      max_msgs: [-1],
      max_bytes: [-1],
      max_age: [0]
    });
    if (this.data.doc) {
      const data = { ...this.data.doc };
      if (data.max_age) {
        data.max_age = data.max_age / 1e9;
      }
      this.form.patchValue(data);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data['max_age'] = data['max_age'] * 1e9;
    if (!this.data.doc) {
      data['project'] = this.app.contextData!._id;
      this.queues.create(data, { xdata: { project: 'oid' } }).subscribe(() => {
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.queues
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

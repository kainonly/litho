import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImessagesService } from '@common/services/imessages.service';
import { QueuesService } from '@common/services/queues.service';
import { Any } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface PublishInput {
  subject?: string;
}

@Component({
  selector: 'app-admin-queues-publish',
  templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {
  form!: FormGroup;
  tips = {
    subject: {
      default: {
        required: `主题不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: PublishInput,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private queues: QueuesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: ['', [Validators.required]],
      payload: ['', [Validators.required]]
    });
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.queues.publish(data.subject, JSON.parse(data.payload)).subscribe(() => {
      this.message.success(`发布成功`);
    });
  }
}

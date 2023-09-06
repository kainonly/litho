import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImessagesService } from '@common/services/imessages.service';
import { Any } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface PublishInput {
  topic?: string;
}

@Component({
  selector: 'app-admin-imessages-publish',
  templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {
  form!: FormGroup;
  tips = {
    topic: {
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
    private imessages: ImessagesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      topic: ['', [Validators.required]],
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
    this.imessages.publish(data.topic, JSON.parse(data.payload)).subscribe(() => {
      this.message.success(`发布成功`);
    });
  }
}

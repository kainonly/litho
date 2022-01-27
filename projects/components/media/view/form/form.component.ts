import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, Page } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { MediaService } from '../../media.service';
import { Media } from '../../types';

@Component({
  selector: 'wpx-media-view-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable!: AnyDto<Media>;
  @Input() media!: MediaService;

  form?: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    this.form.patchValue(this.editable);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Page): void {
    this.media.updateOneById(this.editable._id, { update: { $set: data } }).subscribe(v => {
      for (const [k, v] of Object.entries(data)) {
        this.editable[k] = v;
      }
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}

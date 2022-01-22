import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, Page } from '@weplanx/common';
import { Media, MediaService } from '@weplanx/components/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'wpx-media-view-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() data!: AnyDto<Media>;

  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private media: MediaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    console.log(this.data);
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: Page): void {
    // this.media.updateOneById(this.editable._id, { update: { $set: data } }).subscribe(v => {
    //   for (const [k, v] of Object.entries(data)) {
    //     this.editable[k] = v;
    //   }
    //   this.message.success('数据更新完成');
    //   this.modal.triggerOk();
    // });
  }
}

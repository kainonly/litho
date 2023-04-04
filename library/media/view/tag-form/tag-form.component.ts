import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto } from '@weplanx/ng';
import { MediaTag } from '@weplanx/ng/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PictureTagsService } from '../../picture-tags.service';
import { VideoTagsService } from '../../video-tags.service';

export interface TagFormData {
  doc?: AnyDto<MediaTag>;
  tags: PictureTagsService | VideoTagsService;
}

@Component({
  selector: 'wpx-media-view-tag-form',
  templateUrl: './tag-form.component.html'
})
export class TagFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(NZ_MODAL_DATA) public data: TagFormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      this.data.tags.create(data).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.data.tags.updateById(this.data.doc._id, { $set: data }).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}

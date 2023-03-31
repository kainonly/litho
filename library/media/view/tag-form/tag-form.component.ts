import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AnyDto } from '@weplanx/ng';
import { MediaTag } from '@weplanx/ng/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PictureTagsService } from '../../picture-tags.service';
import { VideoTagsService } from '../../video-tags.service';

@Component({
  selector: 'wpx-media-view-tag-form',
  templateUrl: './tag-form.component.html'
})
export class TagFormComponent implements OnInit {
  @Input() doc!: AnyDto<MediaTag>;
  @Input() tags!: PictureTagsService | VideoTagsService;

  form?: UntypedFormGroup;

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    this.form.patchValue(this.doc);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.doc) {
      this.tags.create(data).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    } else {
      this.tags.updateById(this.doc._id, { $set: data }).subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
    }
  }
}

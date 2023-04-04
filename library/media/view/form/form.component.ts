import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PictureTagsService } from '../../picture-tags.service';
import { PicturesService } from '../../pictures.service';
import { Picture, Video, MediaTag } from '../../types';
import { VideoTagsService } from '../../video-tags.service';
import { VideosService } from '../../videos.service';

export interface ViewFormData {
  doc: AnyDto<Picture | Video>;
  media: PicturesService | VideosService;
  tags: PictureTagsService | VideoTagsService;
}

@Component({
  selector: 'wpx-media-view-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`名称不能为空`
      }
    }
  };
  tagOptions: Array<AnyDto<MediaTag>> = [];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: ViewFormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      tags: [[]]
    });
    this.form.patchValue(this.data.doc);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = {};
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.data.tags.find(filter, { pagesize: 1000 }).subscribe(data => {
      this.tagOptions = [...data];
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.data.media
      .updateById(
        this.data.doc._id,
        {
          $set: data
        },
        {
          xdata: { '$set.tags': 'oids' }
        }
      )
      .subscribe(_ => {
        this.data.doc.name = data.name;
        this.data.doc.tags = data.tags;
        this.message.success($localize`数据更新完成`);
        this.modalRef.triggerOk();
      });
  }
}

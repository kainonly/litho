import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto } from '@weplanx/ng';
import { MediaTag, Picture, PicturesService, Video, VideosService } from '@weplanx/ng/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PictureTagsService } from '../../picture-tags.service';
import { VideoTagsService } from '../../video-tags.service';

@Component({
  selector: 'wpx-media-view-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() doc!: AnyDto<Picture | Video>;
  @Input() media!: PicturesService | VideosService;
  @Input() tags!: PictureTagsService | VideoTagsService;

  form!: FormGroup;
  readonly tips: any = {
    name: {
      default: {
        required: $localize`名称不能为空`
      }
    }
  };
  tagOptions: Array<AnyDto<MediaTag>> = [];

  constructor(
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
    this.form.patchValue(this.doc);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = {};
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags.find(filter, { pagesize: 1000 }).subscribe(data => {
      this.tagOptions = [...data];
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.media
      .updateById(
        this.doc._id,
        {
          $set: data
        },
        {
          xdata: { '$set.tags': 'oids' }
        }
      )
      .subscribe(_ => {
        this.doc.name = data.name;
        this.doc.tags = data.tags;
        this.message.success($localize`数据更新完成`);
        this.modalRef.triggerOk();
      });
  }
}

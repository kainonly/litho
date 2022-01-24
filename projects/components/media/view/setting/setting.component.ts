import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AnyDto, Page } from '@weplanx/common';
import { ImageInfoDto, Media, MediaService } from '@weplanx/components/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'wpx-media-view-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  @Input() data!: AnyDto<Media>;
  @Input() fallback?: string;
  original?: ImageInfoDto;
  output?: ImageInfoDto;

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
      type: [],
      gravity: ['northwest']
    });
    this.getOriginalInfo();
    this.getOutputInfo();
  }

  getOriginalInfo(): void {
    this.media.imageInfo(`/${this.data.url}`).subscribe(data => {
      this.original = data;
    });
  }

  getOutputInfo(): void {
    this.media.imageInfo(`/${this.data.url}/default`).subscribe(data => {
      console.log(data);
      this.output = data;
    });
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: Page): void {
    console.log(data);
  }
}

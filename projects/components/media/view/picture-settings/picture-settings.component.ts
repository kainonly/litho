import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AnyDto, Page } from '@weplanx/common';
import { ImageInfoDto, Media, PicturesService } from '@weplanx/components/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'wpx-media-view-picture-settings',
  templateUrl: './picture-settings.component.html',
  styleUrls: ['./picture-settings.component.scss']
})
export class PictureSettingsComponent implements OnInit {
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
    private pictures: PicturesService
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
    this.pictures.imageInfo(`/${this.data.url}`).subscribe(data => {
      this.original = data;
    });
  }

  getOutputInfo(): void {
    this.pictures.imageInfo(`/${this.data.url}/default`).subscribe(data => {
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

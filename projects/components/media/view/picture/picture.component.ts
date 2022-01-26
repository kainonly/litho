import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AnyDto, Page } from '@weplanx/common';
import { ImageInfoDto, Media, PicturesService } from '@weplanx/components/media';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'wpx-media-view-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input() data!: AnyDto<Media>;
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

  get type(): FormControl {
    return this.form!.get('type') as FormControl;
  }

  getOriginalInfo(): void {
    this.pictures.imageInfo(`/${this.data.url}.image`).subscribe(data => {
      this.original = data;
    });
  }

  getOutputInfo(): void {
    this.pictures.imageInfo(`/${this.data.url}`).subscribe(data => {
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

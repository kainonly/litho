import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AnyDto, ImageInfoDto, Page, TencentService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PicturesService } from '../../pictures.service';
import { Media } from '../../types';

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
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pictures: PicturesService,
    @Optional() private tencent: TencentService
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
    this.tencent.cosImageInfo(`/${this.data.url}.image`).subscribe(data => {
      this.original = data;
    });
  }

  getOutputInfo(): void {
    this.tencent.cosImageInfo(`/${this.data.url}`).subscribe(data => {
      this.output = data;
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Page): void {
    console.log(data);
  }
}

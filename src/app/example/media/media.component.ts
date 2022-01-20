import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-example-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  form!: FormGroup;

  constructor(public wpx: WpxService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      avatar: []
    });
  }

  get avatar(): string {
    return this.form.get('avatar')?.value;
  }

  upload(info: NzUploadChangeParam): void {
    if (info.type === 'success') {
      this.message.success('头像上传成功');
    }
  }

  submit(data: any): void {
    console.log(data);
  }
}

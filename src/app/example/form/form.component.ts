import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxService } from '@weplanx/common';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-example-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  featureOptions: NzCheckBoxOptionInterface[] = [
    { label: '特性1', value: '1' },
    { label: '特性2', value: '2' },
    { label: '特性3', value: '3' }
  ];

  constructor(public wpx: WpxService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      feature: [['1']],
      avatar: [],
      picture: [],
      video: []
    });
    this.form.patchValue({
      picture: [
        'weplanx/20220126/008f4c1c-b124-47bf-9144-c38af9c9b1f8',
        'weplanx/20220126/01ec088d-f74d-44e8-87e9-a673690387f0',
        'weplanx/20220126/03b93f79-70ac-4606-9f6d-98e1c9a1aa88'
      ],
      video: [
        'weplanx/20220126/87a9b0b6-804d-4d42-b3ab-58c83ade9345',
        'weplanx/20220126/8654e15f-9bbc-412c-bb2b-a594a3bb5144'
      ]
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

  test(e: any): void {
    console.log(e);
  }

  submit(data: any): void {
    console.log(data);
  }
}

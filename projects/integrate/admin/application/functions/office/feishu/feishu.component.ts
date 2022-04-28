import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-functions-office-feishu',
  templateUrl: './feishu.component.html'
})
export class FeishuComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      feishu_app_id: [null, [Validators.required]],
      feishu_app_secret: [null, [Validators.required]],
      feishu_encrypt_key: [null, [Validators.required]],
      feishu_verification_token: [null, [Validators.required]]
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('office_platform', 'feishu'),
      this.wpx.setVar('feishu_app_id', value.feishu_app_id),
      this.wpx.setVar('feishu_app_secret', value.feishu_app_secret),
      this.wpx.setVar('feishu_encrypt_key', value.feishu_encrypt_key),
      this.wpx.setVar('feishu_verification_token', value.feishu_verification_token)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}

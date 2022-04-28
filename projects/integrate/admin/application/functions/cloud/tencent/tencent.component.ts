import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-functions-cloud-tencent',
  templateUrl: './tencent.component.html'
})
export class TencentComponent implements OnInit {
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
      tencent_secret_id: [null, [Validators.required]],
      tencent_secret_key: [null, [Validators.required]]
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('cloud_platform', 'tencent'),
      this.wpx.setVar('tencent_secret_id', value.tencent_secret_id),
      this.wpx.setVar('tencent_secret_key', value.tencent_secret_key)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}

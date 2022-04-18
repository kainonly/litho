import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-policy-ip-lock',
  templateUrl: './ip-lock.component.html'
})
export class IpLockComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;
  formatterTimes = (value: number): string => `${value} 次`;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      times: [10, [Validators.required]]
    });
    this.form.patchValue({
      times: this.data['ip_login_failed_times']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    this.wpx.setVar('ip_login_failed_times', value.times).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}

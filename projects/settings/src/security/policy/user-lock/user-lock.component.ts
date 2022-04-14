import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-settings-policy-user-lock',
  templateUrl: './user-lock.component.html'
})
export class UserLockComponent implements OnInit {
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
      times: [5, [Validators.required]],
      number: [15, [Validators.required]],
      unit: ['m', [Validators.required]]
    });
    const value = this.data['user_lock_time'];
    const l = value.length;
    this.form.patchValue({
      times: this.data['user_login_failed_times'],
      number: value.slice(0, l - 1),
      unit: value[l - 1]
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('user_login_failed_times', value.times),
      this.wpx.setVar('user_lock_time', `${value.number}${value.unit}`)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}

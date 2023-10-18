import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-security-user-lock',
  templateUrl: './user-lock.component.html'
})
export class UserLockComponent implements OnInit {
  form!: FormGroup;
  tips = {
    LoginFailures: {
      default: {
        required: `连续登录失败上限不能为空`
      }
    },
    LoginTTL: {
      default: {
        required: `锁定时间不能为空`
      }
    }
  };
  formatterTimes = (value: number): string => `${value} 次`;
  formatterSec = (value: number): string => `${value} s`;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      LoginFailures: [0, [Validators.required]],
      LoginTTL: [0, [Validators.required]]
    });
    const data = {
      LoginFailures: this.data['LoginFailures'],
      LoginTTL: this.data['LoginTTL'] / 1e9
    };
    this.form.patchValue(data);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    data['LoginTTL'] = data['LoginTTL'] * 1e9;
    this.wpx.setValues(data).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}

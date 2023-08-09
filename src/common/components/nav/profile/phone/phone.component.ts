import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nav-profile-phone',
  templateUrl: './phone.component.html'
})
export class PhoneComponent implements OnInit {
  form!: FormGroup;
  tips = {
    phone: {
      default: {
        required: `手机号码不能为空`
      }
    },
    code: {
      default: {
        required: `验证码不能为空`
      }
    }
  };

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      area: ['+86', [Validators.required]],
      phone: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUserPhone(data.phone, data.code).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}

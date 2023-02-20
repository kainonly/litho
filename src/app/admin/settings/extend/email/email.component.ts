import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-extend-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  tips = {
    email_host: {
      default: {
        required: $localize`SMTP 主机不能为空`
      }
    },
    email_port: {
      default: {
        required: $localize`SMTP 端口不能为空`
      }
    },
    email_username: {
      default: {
        required: $localize`用户名不能为空`
      }
    },
    email_password: {
      default: {
        required: $localize`密码不能为空`
      }
    }
  };
  @Input() values!: Record<string, any>;
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email_host: [null, [Validators.required]],
      email_port: [null, [Validators.required]],
      email_username: [null, [Validators.required]],
      email_password: [null, [Validators.required]]
    });
    this.form.patchValue({
      email_host: this.values['email_host'],
      email_port: this.values['email_port'],
      email_username: this.values['email_username']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}

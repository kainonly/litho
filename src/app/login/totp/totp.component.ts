import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { Any } from '@weplanx/ng';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login-totp',
  templateUrl: './totp.component.html'
})
export class TotpComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  tips = {
    email: {
      default: {
        required: `电子邮件不能为空`,
        email: `电子邮件格式不规范`
      }
    },
    totp: {
      default: {
        required: `口令不能为空`
      }
    }
  };

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      code: [null, [Validators.required]]
    });
  }

  submit(data: Any): void {
    this.loading = true;
    this.app.loginTotp(data.email, data.code).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/');
        this.notification.success(`认证状态`, `🚀登录成功，正在加载数据~`);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

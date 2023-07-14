import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login-basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  tips = {
    email: {
      default: {
        required: `电子邮件不能为空`,
        email: `电子邮件格式不规范`
      }
    },
    password: {
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
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(data: any): void {
    this.loading = true;
    this.app.login(data).subscribe({
      next: async () => {
        this.loading = false;
        await this.router.navigateByUrl('/');
        this.notification.success(`认证状态`, `🚀登录成功，正在加载数据~`);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

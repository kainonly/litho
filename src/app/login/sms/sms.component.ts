import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { Any } from '@weplanx/ng';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login-sms',
  templateUrl: './sms.component.html'
})
export class SmsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  tips = {
    phone: {
      default: {
        required: `手机号码不能为空`,
        pattern: '手机号码格式不规范'
      }
    },
    code: {
      default: {
        required: `验证码不能为空`,
        pattern: '验证码格式不规范'
      }
    }
  };
  timer = 0;
  private timeId?: number;

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      area: ['+86', [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/[0-9]{11}/)]],
      code: [null, [Validators.required, Validators.pattern(/[0-9]{6}/)]]
    });
  }

  ngOnDestroy(): void {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  }

  getCode(): void {
    const phone = this.form.get('area')!.value + this.form.get('phone')!.value;
    this.app.getLoginSms(phone).subscribe(() => {
      this.timer = 60;
      this.timeId = setInterval(() => {
        if (!this.timer) {
          clearInterval(this.timeId);
          return;
        }
        this.timer--;
      }, 1000);
      console.debug('code:ok');
    });
  }

  submit(data: Any): void {
    this.loading = true;
    this.app.loginSms(data.area + data.phone, data.code).subscribe({
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

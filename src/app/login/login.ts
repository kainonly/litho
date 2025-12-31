import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Global, SharedModule } from '@shared';
import { Any } from '@shared/models';

/** 登录方式 */
type LoginMode = 'email' | 'sms';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.less']
})
export class Login implements OnDestroy {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  // 登录模式
  loginMode: LoginMode = 'email';

  // 邮箱登录表单
  emailForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    remember: [true]
  });

  // 短信登录表单
  smsForm: FormGroup = this.fb.group({
    phonePrefix: ['+86'],
    phone: [null, [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]],
    code: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
    remember: [true]
  });

  loading = false;
  countdown = 0;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  ngOnDestroy(): void {
    if (this.countdownTimer !== null) {
      clearInterval(this.countdownTimer);
    }
  }

  /** 切换登录方式 */
  switchLoginMode(mode: LoginMode): void {
    this.loginMode = mode;
  }

  /** 发送验证码 */
  sendCode(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.countdown > 0 || !this.smsForm.get('phone')?.valid) {
      return;
    }

    // TODO: 调用发送验证码 API
    const phone = this.smsForm.get('phone')?.value;
    const prefix = this.smsForm.get('phonePrefix')?.value;
    console.log(`发送验证码到: ${prefix}${phone}`);

    // 开始倒计时
    this.countdown = 60;
    this.countdownTimer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    }, 1000);

    this.notification.success('验证码已发送', '请查收短信');
  }

  /** 邮箱登录提交 */
  submitEmail(data: Any): void {
    this.loading = true;
    this.global
      .login(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/jobs');
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  /** 短信登录提交 */
  submitSms(data: Any): void {
    this.loading = true;
    // TODO: 调用短信登录 API
    console.log('短信登录数据:', data);

    // 模拟登录
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/jobs');
    }, 1000);
  }

  ssoLogin(type: string): void {
    console.log(`SSO 登录类型: ${type}`);
  }
}

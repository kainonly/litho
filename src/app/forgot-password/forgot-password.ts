import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { SharedModule } from '@shared';

/** 重置密码步骤 */
type ResetStep = 'request' | 'verify' | 'reset' | 'success';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.less']
})
export class ForgotPassword implements OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  // 当前步骤
  currentStep: ResetStep = 'request';

  // 请求重置表单（输入邮箱）
  requestForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

  // 验证码表单
  verifyForm: FormGroup = this.fb.group({
    code: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  // 重置密码表单
  resetForm: FormGroup = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required]]
  });

  loading = false;
  countdown = 0;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  // 保存邮箱用于显示
  submittedEmail = '';

  ngOnDestroy(): void {
    if (this.countdownTimer !== null) {
      clearInterval(this.countdownTimer);
    }
  }

  /** 提交邮箱请求验证码 */
  submitRequest(): void {
    if (!this.requestForm.valid) {
      return;
    }

    this.loading = true;
    this.submittedEmail = this.requestForm.get('email')?.value;

    // TODO: 调用发送验证码 API
    console.log('发送重置验证码到:', this.submittedEmail);

    // 模拟 API 调用
    setTimeout(() => {
      this.loading = false;
      this.currentStep = 'verify';
      this.startCountdown();
      this.notification.success('验证码已发送', '请查收邮件');
    }, 1000);
  }

  /** 验证验证码 */
  submitVerify(): void {
    if (!this.verifyForm.valid) {
      return;
    }

    this.loading = true;
    const code = this.verifyForm.get('code')?.value;

    // TODO: 调用验证码校验 API
    console.log('验证码:', code);

    // 模拟 API 调用
    setTimeout(() => {
      this.loading = false;
      this.currentStep = 'reset';
    }, 1000);
  }

  /** 重置密码 */
  submitReset(): void {
    if (!this.resetForm.valid) {
      return;
    }

    const password = this.resetForm.get('password')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.notification.error('错误', '两次输入的密码不一致');
      return;
    }

    this.loading = true;

    // TODO: 调用重置密码 API
    console.log('新密码:', password);

    // 模拟 API 调用
    setTimeout(() => {
      this.loading = false;
      this.currentStep = 'success';
      this.notification.success('密码重置成功', '请使用新密码登录');
    }, 1000);
  }

  /** 重新发送验证码 */
  resendCode(event: Event): void {
    event.preventDefault();

    if (this.countdown > 0) {
      return;
    }

    // TODO: 调用发送验证码 API
    console.log('重新发送验证码到:', this.submittedEmail);

    this.startCountdown();
    this.notification.success('验证码已发送', '请查收邮件');
  }

  /** 开始倒计时 */
  private startCountdown(): void {
    this.countdown = 60;
    this.countdownTimer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    }, 1000);
  }

  /** 返回登录页 */
  backToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  /** 返回上一步 */
  goBack(): void {
    switch (this.currentStep) {
      case 'verify':
        this.currentStep = 'request';
        break;
      case 'reset':
        this.currentStep = 'verify';
        break;
      default:
        this.backToLogin();
    }
  }
}


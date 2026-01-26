import { Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { Global, SharedModule } from '@shared';

import { Basic } from './basic/basic';
import { Sms } from './sms/sms';

/** 登录方式 */
type Mode = 'email' | 'sms';

@Component({
  standalone: true,
  imports: [SharedModule, Basic, Sms],
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

  mode = signal<Mode>('email');
  options: NzSegmentedOption[] = [
    {
      label: '邮箱登录',
      value: 'email',
      icon: 'mail'
    },
    {
      label: '短信登录',
      value: 'sms',
      icon: 'mobile'
    }
  ];

  loading = false;
  countdown = 0;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  ngOnDestroy(): void {
    if (this.countdownTimer !== null) {
      clearInterval(this.countdownTimer);
    }
  }
}

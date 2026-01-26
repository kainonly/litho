import { Component, DestroyRef, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Global, Loading, SharedModule } from '@shared';
import { Any } from '@shared/models';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login-sms',
  templateUrl: './sms.html',
  styleUrl: './sms.less'
})
export class Sms implements OnDestroy {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  formatter: (value: string) => string = value => value.toUpperCase();
  form: FormGroup = this.fb.group({
    phone: [null, [Validators.required, Validators.pattern(/[0-9]{11}/)]],
    code: [null, [Validators.required, Validators.pattern(/[0-9]{6}/)]],
    remember: [true]
  });

  loading = new Loading();
  countdown = signal(0);
  timer = 0;
  private timeId?: Any;

  ngOnDestroy(): void {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  }

  getCode(): void {
    // this.global
    //   .getLoginSms(this.form.get('phone')!.value)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(() => {
    //     this.timer = 60;
    //     this.timeId = setInterval(() => {
    //       if (!this.timer) {
    //         clearInterval(this.timeId);
    //         return;
    //       }
    //       this.timer--;
    //     }, 1000);
    //   });
  }

  submit(data: Any): void {
    this.loading.start();
    // this.global
    //   .loginSms(data.phone, data.code)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe({
    //     next: () => {
    //       this.loading.end();
    //       this.router.navigateByUrl('/index');
    //       this.notification.success(`鉴权成功`, `🚀账号登录成功, 正在加载页面...`);
    //     },
    //     error: () => {
    //       this.loading.end();
    //     }
    //   });
  }
}

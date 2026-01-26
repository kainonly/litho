import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Global, Loading, SharedModule } from '@shared';
import { Any } from '@shared/models';

@Component({
  standalone: true,
  imports: [SharedModule, RouterLink],
  selector: 'app-login-basic',
  templateUrl: './basic.html',
  styleUrl: './basic.less'
})
export class Basic {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  loading = new Loading();
  form: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    remember: [true]
  });

  submit(data: Any): void {
    this.loading.start();
    this.global
      .login(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.end();
          this.router.navigateByUrl('/dashboard');
          this.notification.success(`鉴权成功`, `🚀账号登录成功, 正在加载页面...`);
        },
        error: e => {
          this.loading.end();
          if (e.error.code == 'ErrLoginNotExists' || e.error.code == 'ErrLoginInvalid') {
            this.notification.error(`登录失败`, `❌账号或密码错误，请重新输入`);
          }
        }
      });
  }
}

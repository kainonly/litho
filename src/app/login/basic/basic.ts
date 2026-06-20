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
    username: [null, [Validators.required]],
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
          this.router.navigateByUrl('/');
          this.notification.success(`登录成功`, `🚀 欢迎回来，正在进入系统...`);
        },
        error: response => {
          this.loading.end();
          this.notification.error(`登录失败`, response.error.message);
        }
      });
  }
}

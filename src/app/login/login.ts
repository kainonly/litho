import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Global, SharedModule } from '@shared';
import { Any } from '@shared/models';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.less']
})
export class Login {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  form: FormGroup = this.fb.group({
    email: [null, [Validators.email]],
    password: [null, [Validators.required]],
    remember: [true]
  });
  loading = false;
  passwordVisible = false;

  ssoLogin(type: string): void {
    // TODO: 实现对应平台的 SSO 登录逻辑 (type 为 'feishu', 'wecom', 'dingtalk', 'passkey')
    console.log(`SSO 登录类型: ${type}`);
  }

  submit(data: Any): void {
    this.loading = true;
    this.global
      .login(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/jobs');
        },
        error: e => {
          this.loading = false;
        }
      });
  }
}

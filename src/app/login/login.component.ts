import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WpxService } from '@weplanx/ng';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  today = new Date();
  loading = false;
  form!: UntypedFormGroup;

  constructor(
    public wpx: WpxService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      identity: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get identity(): UntypedFormControl {
    return this.form?.get('identity') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.form?.get('password') as UntypedFormControl;
  }

  submit(data: any): void {
    this.loading = true;
    this.wpx.login(data).subscribe({
      next: () => {
        this.loading = false;
        this.notification.success('认证状态', '登录成功，正在加载数据~');
        this.router.navigateByUrl('/pages');
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  /**
   * 飞书授权
   */
  feishuOAuth(): void {
    this.wpx.oauth().subscribe(v => {
      window.location.href = v;
    });
  }
}

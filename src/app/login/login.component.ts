import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WpxService } from '@weplanx/ng';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  form!: FormGroup;

  constructor(
    private wpx: WpxService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      identity: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get identity(): FormControl {
    return this.form?.get('identity') as FormControl;
  }

  get password(): FormControl {
    return this.form?.get('password') as FormControl;
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
    this.wpx.loadOAuth().subscribe(v => {
      window.location.href = v;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    public wpx: WpxService,
    private app: AppService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  submit(data: any): void {
    this.loading = true;
    this.app.login(data).subscribe({
      next: async () => {
        this.loading = false;
        await this.router.navigateByUrl('/');
        this.notification.success($localize`认证状态`, $localize`🚀登录成功，正在加载数据~`);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

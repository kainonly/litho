import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@common/app.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  now = new Date().getFullYear();

  constructor(
    public bit: BitService,
    private appService: AppService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bit.clear();
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(20)]]
    });
  }

  submit(data: any): void {
    this.appService.login(data.username, data.password).subscribe(res => {
      switch (res.error) {
        case 0:
          this.bit.clear();
          this.notification.success('认证状态', '登录成功，正在加载数据~');
          this.router.navigateByUrl('/');
          break;
        case 1:
          this.notification.error('认证状态', '您的登录失败，请确实账户口令是否正确');
          break;
        case 2:
          this.notification.error('认证状态', '您登录失败的次数过多，请稍后再试');
          break;
      }
    });
  }
}

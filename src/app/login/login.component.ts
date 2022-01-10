import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@common/app.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  now = new Date().getFullYear();
  form!: FormGroup;

  constructor(
    private appService: AppService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(20)]]
    });
  }

  submit(data: any): void {
    this.appService.login(data.username, data.password).subscribe(() => {
      this.notification.success('认证状态', '登录成功，正在加载数据~');
      this.router.navigateByUrl('/pages');
    });
  }
}

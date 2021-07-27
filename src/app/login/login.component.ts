import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '@common/app.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BitService } from 'ngx-bit';

import packer from './language';

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
    this.bit.registerLocales(packer);
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
          this.notification.success(this.bit.l.auth, this.bit.l.loginSuccess);
          this.router.navigateByUrl('/');
          break;
        case 1:
          this.notification.error(this.bit.l.auth, this.bit.l.loginError);
          break;
        case 2:
          this.notification.error(this.bit.l.auth, this.bit.l.loginManyTimes);
          break;
      }
    });
  }
}

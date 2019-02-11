import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {BitService} from 'dev-ngx-bit';

import {MainService} from '../api/main.service';
import packer from './language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(private main: MainService,
              private notification: NzNotificationService,
              private router: Router,
              private fb: FormBuilder,
              public bit: BitService) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer);
    this.bit.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(18)]]
    });
  }

  submit = (data) => {
    this.loading = true;
    this.main.login(data.username, data.password).subscribe(res => {
      if (!res.error) {
        localStorage.setItem('username', data.username);
        sessionStorage.setItem('login', 'true');
        this.notification.success(this.bit.l['login_tips'], this.bit.l['login_success']);
        this.loading = false;
        this.router.navigateByUrl('/');
      } else {
        this.loading = false;
        this.notification.error(this.bit.l['login_tips'], this.bit.l['login_failed']);
      }
    });
  };
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { StorageMap } from '@ngx-pwa/local-storage';
import { AppService } from '@vanx/framework';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BitService } from 'ngx-bit';

import * as packer from './language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  users: any[] = [];
  logining = false;

  constructor(
    public bit: BitService,
    private appService: AppService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder,
    private storage: StorageMap
  ) {}

  ngOnInit(): void {
    this.bit.clear();
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(20)]],
      remember: [1, [Validators.required]]
    });
    this.storage.get('users').subscribe((data: unknown) => {
      if (data) {
        this.users = [...(<Set<string>>data).keys()];
      }
    });
  }

  addUsername(username: string): void {
    this.storage
      .get('users')
      .pipe(
        switchMap((data: unknown) =>
          this.storage.set('users', data ? (<Set<string>>data).add(username) : new Set([username]))
        )
      )
      .subscribe(() => {});
  }

  deleteUsername(event: any, username: string): void {
    this.storage
      .get('users')
      .pipe(
        switchMap((data: unknown) => {
          (<Set<string>>data).delete(username);
          this.users = [...(<Set<string>>data).keys()];
          return this.storage.set('users', data);
        })
      )
      .subscribe(() => {});
    event.stopPropagation();
  }

  submit(data: any): void {
    this.logining = true;
    this.appService.login(data.username, data.password).subscribe(res => {
      switch (res.error) {
        case 0:
          this.bit.clear();
          if (data.remember) {
            this.addUsername(data.username);
          }
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
      this.logining = false;
    });
  }
}

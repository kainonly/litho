import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MainService } from '@api/main.service';
import { BitService, BitSupportService } from 'ngx-bit';
import { StorageMap } from '@ngx-pwa/local-storage';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];

  constructor(
    public bit: BitService,
    private mainService: MainService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder,
    private support: BitSupportService,
    private storageMap: StorageMap
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(20)]],
      remember: [1, [Validators.required]]
    });
    this.storageMap.get('users').subscribe((data: Set<string>) => {
      if (data) {
        this.users = [...data.keys()];
      }
    });
  }

  submit(data: any): void {
    this.mainService.login(data.username, data.password).subscribe(res => {
      if (!res.error) {
        this.support.clearStorage();
        if (data.remember) {
          this.storageMap
            .get('users')
            .pipe(
              switchMap((lists: Set<string>) => this.storageMap.set('users', lists ? lists.add(data.username) : new Set([data.username])))
            )
            .subscribe(() => {
            });
        }
        this.notification.success(this.bit.l.auth, this.bit.l.loginSuccess);
        this.router.navigateByUrl('/');
      } else {
        this.notification.error(this.bit.l.auth, this.bit.l.loginError);
      }
    });
  }
}

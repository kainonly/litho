import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IpListComponent } from './ip-list/ip-list.component';
import { IpLockComponent } from './ip-lock/ip-lock.component';
import { PasswordExpireComponent } from './password-expire/password-expire.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { SessionExpireComponent } from './session-expire/session-expire.component';
import { UserLockComponent } from './user-lock/user-lock.component';

@Component({
  selector: 'wpx-admin-policy',
  templateUrl: './policy.component.html'
})
export class PolicyComponent implements OnInit {
  data: Record<string, any> = {};
  ipList: any[] = [];

  constructor(private modal: NzModalService, private wpx: WpxService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.wpx
      .getVars(
        'user_session_expire',
        'user_login_failed_times',
        'user_lock_time',
        'ip_login_failed_times',
        'ip_whitelist',
        'ip_blacklist',
        'password_strength',
        'password_expire'
      )
      .subscribe(v => {
        this.data = {
          user_session_expire: v['user_session_expire'] ?? '1h',
          user_login_failed_times: parseInt(v['user_login_failed_times']) ?? 5,
          user_lock_time: v['user_lock_time'] ?? '15m',
          ip_login_failed_times: parseInt(v['ip_login_failed_times']) ?? 10,
          ip_whitelist: !v['ip_whitelist'] ? [] : JSON.parse(v['ip_whitelist']),
          ip_blacklist: !v['ip_blacklist'] ? [] : JSON.parse(v['ip_blacklist']),
          password_strength: v['password_strength'] ?? 1,
          password_expire: parseInt(v['password_expire']) ?? 365
        };
        this.ipList = [
          ...(<string[]>this.data['ip_whitelist']).map(v => ({ type: 'white', value: v })),
          ...(<string[]>this.data['ip_blacklist']).map(v => ({ type: 'black', value: v }))
        ];
      });
  }

  private setVar(component: Type<{ data: Record<string, any> }>): void {
    this.modal.create({
      nzTitle: '设置',
      nzContent: component,
      nzComponentParams: {
        data: this.data
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  setSessionExpire(): void {
    this.setVar(SessionExpireComponent);
  }

  setUserLock(): void {
    this.setVar(UserLockComponent);
  }

  setIpLock(): void {
    this.setVar(IpLockComponent);
  }

  setIpList(): void {
    this.setVar(IpListComponent);
  }

  setPasswordStrength(): void {
    this.setVar(PasswordStrengthComponent);
  }

  setPasswordExpire(): void {
    this.setVar(PasswordExpireComponent);
  }
}

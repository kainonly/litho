import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { WpxStoreService } from '@weplanx/ng/store';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IpListComponent } from './ip-list/ip-list.component';
import { IpLockComponent } from './ip-lock/ip-lock.component';
import { PwdStrategyComponent } from './pwd-strategy/pwd-strategy.component';
import { PwdTtlComponent } from './pwd-ttl/pwd-ttl.component';
import { SessionComponent } from './session/session.component';
import { UserLockComponent } from './user-lock/user-lock.component';

@Component({
  selector: 'app-admin-security',
  templateUrl: './security.component.html'
})
export class SecurityComponent implements OnInit {
  tabIndex = 0;
  values: Record<string, any> = {};

  constructor(private modal: NzModalService, private wpx: WpxService, private store: WpxStoreService) {}

  ngOnInit(): void {
    this.getData();
  }

  saveTabIndex(): void {
    this.store.set<number>('admin-security', this.tabIndex).subscribe(() => {});
  }

  getData(): void {
    this.store.get<number>('admin-security').subscribe(v => {
      if (v) {
        this.tabIndex = v;
      }
    });
    this.wpx
      .getValues([
        'session_ttl',
        'login_ttl',
        'login_failures',
        'ip_login_failures',
        'ip_whitelist',
        'ip_blacklist',
        'pwd_strategy',
        'pwd_ttl'
      ])
      .subscribe(data => {
        this.values = data;
      });
  }

  private setModal(component: Type<{ values: Record<string, any> }>): void {
    this.modal.create({
      nzTitle: $localize`设置`,
      nzContent: component,
      nzComponentParams: {
        values: this.values
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }

  setSession(): void {
    this.setModal(SessionComponent);
  }

  setUserLock(): void {
    this.setModal(UserLockComponent);
  }

  setIpLock(): void {
    this.setModal(IpLockComponent);
  }

  setPwdStrategy(): void {
    this.setModal(PwdStrategyComponent);
  }

  setPwdTtl(): void {
    this.setModal(PwdTtlComponent);
  }

  setIpList(key: 'ip_whitelist' | 'ip_blacklist'): void {
    const name = key === 'ip_whitelist' ? $localize`白名单` : $localize`黑名单`;
    this.modal.create({
      nzTitle: $localize`${name}设置`,
      nzContent: IpListComponent,
      nzComponentParams: {
        key,
        ip: this.values[key]
      },
      nzOnOk: () => {
        this.getData();
      }
    });
  }
}

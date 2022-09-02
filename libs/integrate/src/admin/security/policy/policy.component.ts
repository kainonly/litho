import { Component, OnInit, Type } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IpListComponent } from './ip-list/ip-list.component';
import { IpLockComponent } from './ip-lock/ip-lock.component';
import { PwdStrategyComponent } from './pwd-strategy/pwd-strategy.component';
import { PwdTtlComponent } from './pwd-ttl/pwd-ttl.component';
import { SessionComponent } from './session/session.component';
import { UserLockComponent } from './user-lock/user-lock.component';

@Component({
  selector: 'wpx-admin-policy',
  templateUrl: './policy.component.html'
})
export class PolicyComponent implements OnInit {
  /**
   * 数据
   */
  data: Record<string, any> = {};
  /**
   * IP 名单
   */
  ipList: any[] = [];

  constructor(private modal: NzModalService, private wpx: WpxService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
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
        this.data = data;
        this.ipList = [
          ...(<string[]>this.data['ip_whitelist']).map(v => ({ type: 'white', value: v })),
          ...(<string[]>this.data['ip_blacklist']).map(v => ({ type: 'black', value: v }))
        ];
      });
  }

  /**
   * 设置对话框
   * @param component
   * @private
   */
  private setModal(component: Type<{ data: Record<string, any> }>): void {
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

  /**
   * 设置会话超时策略
   */
  setSession(): void {
    this.setModal(SessionComponent);
  }

  /**
   * 设置帐号锁定策略
   */
  setUserLock(): void {
    this.setModal(UserLockComponent);
  }

  /**
   * 设置 IP 锁定策略
   */
  setIpLock(): void {
    this.setModal(IpLockComponent);
  }

  /**
   * 设置 IP 名单
   */
  setIpList(): void {
    this.setModal(IpListComponent);
  }

  /**
   * 设置密码强度策略
   */
  setPwdStrategy(): void {
    this.setModal(PwdStrategyComponent);
  }

  /**
   * 设置密码有效期策略
   */
  setPwdTtl(): void {
    this.setModal(PwdTtlComponent);
  }
}

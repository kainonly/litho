import { Component, inject, signal } from '@angular/core';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { Global, SharedModule } from '@shared';

import { Basic } from './basic/basic';
import { Sms } from './sms/sms';

/** 登录方式 */
type Mode = 'email' | 'sms';

@Component({
  standalone: true,
  imports: [SharedModule, Basic, Sms],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.less']
})
export class Login {
  global = inject(Global);

  mode = signal<Mode>('email');
  options: NzSegmentedOption[] = [
    {
      label: '账号登录',
      value: 'email',
      icon: 'mail'
    },
    {
      label: '短信登录',
      value: 'sms',
      icon: 'mobile'
    }
  ];
}

import { Component } from '@angular/core';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-center-safety',
  templateUrl: './safety.component.html'
})
export class SafetyComponent {
  constructor(public wpx: WpxService, private app: AppService, private modal: NzModalService) {}

  openPassword(): void {
    this.modal.create({
      nzTitle: `帐号密码`,
      nzContent: PasswordComponent
    });
  }

  openEmail(): void {
    this.modal.create({
      nzTitle: `安全邮箱`,
      nzContent: EmailComponent,
      nzOnOk: () => {
        this.app.getUser().subscribe(() => {});
      }
    });
  }
}

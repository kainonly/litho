import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@app';
import { TotpComponent } from '@common/components/nav/profile/totp/totp.component';
import { ShareModule } from '@common/share.module';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';

@Component({
  standalone: true,
  imports: [ShareModule, EmailComponent, NameComponent, PasswordComponent, TotpComponent],
  selector: 'app-nav-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  index = 0;

  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private drawer: NzDrawerRef
  ) {}

  private setModal(component: Type<void>, callback?: () => void): void {
    this.modal.create({
      nzTitle: `User`,
      nzWidth: 420,
      nzContent: component,
      nzOnOk: () => {
        // if (!callback) {
        //   this.app.getUser().subscribe();
        //   return;
        // }
        // callback();
      }
    });
  }

  setEmail(): void {
    this.setModal(EmailComponent, () => {
      // this.app.logout().subscribe(() => {
      //   this.drawer.close();
      //   this.app.user.set(null);
      //   this.router.navigateByUrl('/login');
      // });
    });
  }

  setName(): void {
    this.setModal(NameComponent);
  }

  setPassword(): void {
    this.setModal(PasswordComponent);
  }

  setTotp(): void {
    this.setModal(TotpComponent);
  }

  unsetTotp(): void {
    // this.app.unsetUser('totp').subscribe(() => {
    //    this.message.success(`Cancellation successful`);
    //   this.app.getUser().subscribe();
    // });
  }
}

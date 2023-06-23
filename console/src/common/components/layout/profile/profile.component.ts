import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AvatarComponent } from './avatar/avatar.component';
import { BackupEmailComponent } from './backup-email/backup-email.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private draw: NzDrawerRef
  ) {}

  ngOnInit(): void {
    console.log(this.app.user);
  }

  private setModal(component: Type<void>, callback?: () => void): void {
    this.modal.create({
      nzTitle: $localize`Profile Update Form`,
      nzContent: component,
      nzOnOk: () => {
        if (!callback) {
          this.app.getUser().subscribe(() => {});
          return;
        }
        callback();
      }
    });
  }

  setEmail(): void {
    this.setModal(EmailComponent, () => {
      this.app.logout().subscribe(() => {
        this.draw.close();
        this.app.user = undefined;
        this.router.navigateByUrl('/login');
      });
    });
  }

  setName(): void {
    this.setModal(NameComponent);
  }

  setAvatar(): void {
    this.setModal(AvatarComponent);
  }

  setPassword(): void {
    this.setModal(PasswordComponent);
  }

  setBackupEmail(): void {
    this.setModal(BackupEmailComponent);
  }

  linkFeishu(): void {
    this.app.oauth('link').subscribe(v => {
      const popup = window.open(v, '', 'width=800,height=640');
      const $timer = timer(0, 500).subscribe(() => {
        if (popup?.closed) {
          $timer.unsubscribe();
          this.app.getUser().subscribe(() => {});
        }
      });
    });
  }

  unlinkFeishu(): void {
    this.app.unsetUser('feishu').subscribe(() => {
      this.message.success($localize`取消关联成功`);
      this.app.getUser().subscribe(() => {});
    });
  }
}

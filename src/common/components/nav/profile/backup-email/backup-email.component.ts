import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { UsersService } from '@common/services/users.service';
import { Any } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nav-profile-backup-email',
  templateUrl: './backup-email.component.html'
})
export class BackupEmailComponent implements OnInit {
  form!: FormGroup;
  tips = {
    email: {
      default: {
        email: $localize`电子邮件格式不规范`
      }
    }
  };

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private users: UsersService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      backup_email: [null, [Validators.email]]
    });
    this.form.patchValue(this.app.user()!);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app
      .setUser({
        $set: 'backup_email',
        backup_email: data.backup_email
      })
      .subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
  }
}

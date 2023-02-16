import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { UsersService } from '@common/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile-backup-email',
  templateUrl: './backup-email.component.html'
})
export class BackupEmailComponent implements OnInit {
  tips = {
    email: {
      default: {
        email: $localize`Please use the correct email format`
      }
    }
  };
  form!: FormGroup;

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
    this.form.patchValue(this.app.user!);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app
      .setUser({
        $set: 'backup_email',
        backup_email: data.backup_email
      })
      .subscribe(() => {
        this.message.success($localize`Data update complete`);
        this.modalRef.triggerOk();
      });
  }
}

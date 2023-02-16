import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      avatar: [null]
    });
    this.form.patchValue(this.app.user!);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app
      .setUser({
        $set: 'avatar',
        avatar: data.avatar
      })
      .subscribe(() => {
        this.message.success($localize`Data update complete`);
        this.modalRef.triggerOk();
      });
  }
}

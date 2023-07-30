import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Any } from '@weplanx/ng';

@Component({
  selector: 'app-nav-profile-avatar',
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
    this.form.patchValue(this.app.user()!);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app
      .setUser({
        $set: 'avatar',
        avatar: data.avatar
      })
      .subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
  }
}

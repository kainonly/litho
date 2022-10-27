import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { UsersService } from '../../../namespace/orgs/users/users.service';

@Component({
  selector: 'app-center-work-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private app: AppService,
    private users: UsersService,
    private modalRef: NzModalRef,
    private fb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null],
      avatar: [null]
    });
    this.app.getUser().subscribe(v => {
      this.form.patchValue(v);
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.app.setUser(data).subscribe(() => {
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}

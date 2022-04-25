import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-center-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null],
      email: [null],
      avatar: [null]
    });
    this.wpx.getUser().subscribe(v => {
      this.form.patchValue(v);
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setUser(data).subscribe(() => {
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}

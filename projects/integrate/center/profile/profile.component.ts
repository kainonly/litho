import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
      username: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-z_]+$/)],
        [this.existsUsername]
      ],
      name: [null],
      avatar: [null]
    });
    this.wpx.getUser().subscribe(v => {
      this.form.patchValue(v);
    });
  }

  existsUsername = (control: AbstractControl): Observable<any> => {
    return this.wpx.checkUser('username', control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (data.username === this.wpx.user?.username) {
      delete data.username;
    }
    this.wpx.setUser('profile', data).subscribe(() => {
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}

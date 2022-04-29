import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-center-safety-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email], [this.existsEmail]]
    });
    this.wpx.getUser().subscribe(v => {
      this.form.patchValue(v);
    });
  }

  existsEmail = (control: AbstractControl): Observable<any> => {
    return this.wpx.existsUser('email', control.value);
  };

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setUser('email', data).subscribe(() => {
      this.message.success('数据更新完成');
      this.modalRef.triggerOk();
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'wpx-admin-functions-openapi-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() data!: Record<string, any>;
  form?: FormGroup;

  constructor(
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      openapi_url: [null, [Validators.required]],
      openapi_key: [null, [Validators.required]],
      openapi_secret: [null, [Validators.required]]
    });
    this.form.patchValue({
      openapi_url: this.data['openapi_url'],
      openapi_key: this.data['openapi_key']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(value: any): void {
    forkJoin([
      this.wpx.setVar('openapi_url', value.openapi_url),
      this.wpx.setVar('openapi_key', value.openapi_key),
      this.wpx.setVar('openapi_secret', value.openapi_secret)
    ]).subscribe(() => {
      this.message.success('设置成功');
      this.modalRef.triggerOk();
    });
  }
}

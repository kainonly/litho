import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { KeyValue } from '../types';

@Component({
  selector: 'app-admin-settings-system-values-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    key: {
      default: {
        required: $localize`键名不能为空`
      }
    },
    value: {
      default: {
        required: $localize`键值不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: KeyValue,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      key: [null, [Validators.required]],
      value: [null, [Validators.required]]
    });
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  get key(): string {
    return this.form.get('key')?.value!;
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    switch (this.key) {
      case 'resources':
        data.value = JSON.parse(data.value);
        break;
    }
    this.wpx
      .setValues({
        [data.key]: data.value
      })
      .subscribe(() => {
        this.message.success($localize`数据更新成功`);
        this.modalRef.triggerOk();
      });
  }
}

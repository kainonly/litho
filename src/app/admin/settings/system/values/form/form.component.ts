import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-system-values-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  tips = {
    key: {
      default: {
        required: $localize`The key cannot be empty`
      }
    },
    value: {
      default: {
        required: $localize`The key cannot be empty`
      }
    }
  };
  @Input() data?: Record<string, any>;
  form!: FormGroup;

  constructor(
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
      case 'dsl':
        data.value = JSON.parse(data.value);
        break;
    }
    this.wpx
      .setValues({
        [data.key]: data.value
      })
      .subscribe(() => {
        this.message.success($localize`Data update complete`);
        this.modalRef.triggerOk();
      });
  }
}

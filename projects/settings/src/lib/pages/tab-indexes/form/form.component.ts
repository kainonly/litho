import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../../pages.serivce';

@Component({
  selector: 'wpx-settings-pages-indexes-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() key?: string;
  form?: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      keys: this.fb.array([]),
      unique: [false, [Validators.required]]
    });
  }

  get keys(): FormArray {
    return this.form?.get('keys') as FormArray;
  }

  addKeys(): void {
    this.keys.push(
      this.fb.group({
        key: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeKeys(index: number): void {
    this.keys.removeAt(index);
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    // this.pages.createIndex(this.key!, data).subscribe(v => {
    //   if (!v.code) {
    //     this.modal.triggerOk();
    //     this.message.success('索引更新完成');
    //   } else {
    //     this.notification.error('操作失败', v.message);
    //   }
    // });
  }
}

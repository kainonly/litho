import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../../pages.serivce';

@Component({
  selector: 'wpx-admin-factory-rules-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private pages: PagesSerivce
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      logic: [false, [Validators.required]],
      conditions: this.fb.array([], [Validators.required]),
      display: this.fb.array([], [Validators.required])
    });
  }

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  addCondition(): void {
    this.conditions.push(
      this.fb.group({
        field: [null, [Validators.required]],
        operate: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  get display(): FormArray {
    return this.form.get('display') as FormArray;
  }

  addDisplay(): void {
    this.display.push(this.fb.control(null, [Validators.required]));
  }

  removeDisplay(index: number): void {
    this.display.removeAt(index);
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    this.pages.addSchemaRule(this.pages.id!, data).subscribe(() => {
      this.modal.triggerOk();
      this.message.success('规则更新完成');
    });
  }
}

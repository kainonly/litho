import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnyDto, Page } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../../pages.serivce';
import { fieldTypeValues } from '../../values';

@Component({
  selector: 'settings-pages-schema-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: any;
  @Input() page?: AnyDto<Page>;
  form?: FormGroup;
  typeValues: Array<Record<string, any>> = fieldTypeValues;
  readonly special = ['number', 'radio', 'checkbox', 'select'];

  constructor(
    private modal: NzModalRef,
    private pages: PagesSerivce,
    private fb: FormBuilder,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/), this.existsField]],
      label: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null],
      placeholder: [null],
      default: [null],
      required: [false],
      unique: [false],
      hide: [false],
      modified: [true],
      spec: this.fb.group({
        max: [null],
        min: [null],
        decimal: [null],
        values: this.fb.array([]),
        reference: [null],
        target: [null],
        multiple: [false]
      })
    });
    if (this.editable) {
      this.form.patchValue(this.editable);
      this.form.markAsTouched();
    }
  }

  existsField = (control: AbstractControl): any => {
    if (control.value === this.editable?.key) {
      return null;
    }
    if (this.page?.schema?.fields.hasOwnProperty(control.value)) {
      return { error: true, duplicated: true };
    }
    return null;
  };

  get specValues(): FormArray {
    return this.form?.get('spec')?.get('values') as FormArray;
  }

  addValues(): void {
    this.specValues.push(
      this.fb.group({
        label: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeValues(index: number): void {
    this.specValues.removeAt(index);
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    const key = data.key;
    delete data.key;
    this.pages.updateSchemaField(this.page!._id, key, data).subscribe(v => {
      if (!v.code) {
        this.modal.triggerOk();
        this.message.success('字段更新完成');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}

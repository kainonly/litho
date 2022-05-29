import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AnyDto, Page, SchemaField } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PagesSerivce } from '../../pages.serivce';
import { fieldTypes } from '../../values';

@Component({
  selector: 'wpx-admin-factory-schema-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() page!: AnyDto<Page>;
  @Input() doc?: SchemaField;

  form!: FormGroup;
  currentType?: string;
  typeList: Array<Record<string, any>> = fieldTypes;
  optionPanel = false;
  referenceList: Array<AnyDto<Page>> = [];
  referenceDict: Record<string, SchemaField[]> = {};

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
      hide: [false],
      readonly: [false],
      projection: [1],
      sort: [0],
      option: []
    });
    if (this.doc) {
      this.setType(this.doc.type);
      this.form.patchValue(this.doc);
      this.form.markAsTouched();
    } else {
      this.form.get('sort')?.setValue(Object.keys(this.page.schema?.fields!).length);
    }
    this.form.get('type')?.valueChanges.subscribe(value => {
      this.setType(value);
    });
  }

  existsField = (control: AbstractControl): any => {
    if (control.value === this.doc?.key) {
      return null;
    }
    if (this.page?.schema?.fields.hasOwnProperty(control.value)) {
      return { error: true, duplicated: true };
    }
    return null;
  };

  private setType(value: string): void {
    this.currentType = value;
    switch (value) {
      case 'number':
        this.form.setControl(
          'option',
          this.fb.group({
            max: [null],
            min: [null],
            decimal: [2]
          })
        );
        break;
      case 'date':
      case 'dates':
        this.form.setControl(
          'option',
          this.fb.group({
            time: [false]
          })
        );
        break;
      case 'radio':
      case 'checkbox':
        this.form.setControl(
          'option',
          this.fb.group({
            values: this.fb.array([])
          })
        );
        break;
      case 'select':
        this.form.setControl(
          'option',
          this.fb.group({
            values: this.fb.array([]),
            multiple: [false]
          })
        );
        break;
      case 'ref':
        this.form.setControl(
          'option',
          this.fb.group({
            reference: [null],
            target: [null],
            multiple: [false]
          })
        );
        this.pages.getReferences().subscribe(v => {
          this.referenceList = [...v];
          for (const x of this.referenceList) {
            this.referenceDict[x.schema!.key] = [...x.schema!.fields];
          }
        });
        break;
    }
    this.optionPanel = ['number', 'date', 'dates', 'radio', 'checkbox', 'select', 'ref'].includes(value);
  }

  get optionValues(): FormArray {
    return this.form?.get('option')?.get('values') as FormArray;
  }

  addOptionValues(): void {
    this.optionValues.push(
      this.fb.group({
        label: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeOptionValues(index: number): void {
    this.optionValues.removeAt(index);
  }

  get optionReference(): FormControl {
    return this.form?.get('option')?.get('reference') as FormControl;
  }

  close(): void {
    this.modal.triggerCancel();
  }

  submit(data: any): void {
    this.pages.updateSchemaField(this.page!._id, data.sort, data).subscribe(v => {
      if (!v.code) {
        this.modal.triggerOk();
        this.message.success('字段更新完成');
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}

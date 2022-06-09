import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AnyDto, Page, SchemaField } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { FactorySerivce } from '../../factory.serivce';
import { fieldTypes, hasOption } from '../../values';

@Component({
  selector: 'wpx-admin-factory-schema-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  /**
   * 页面单元
   */
  @Input() page!: AnyDto<Page>;
  /**
   * 编辑
   */
  @Input() doc?: SchemaField;
  /**
   * 字段类型
   */
  fieldTypes: Array<Record<string, any>> = fieldTypes;
  /**
   * 表单
   */
  form!: FormGroup;
  /**
   * 当前字段类型
   */
  type?: string;
  /**
   * 显示扩展配置
   */
  visibleOption = false;
  /**
   * 引用数据
   */
  references: Array<AnyDto<Page>> = [];
  /**
   * 引用字典
   */
  referenceDict: Record<string, SchemaField[]> = {};

  constructor(
    private modal: NzModalRef,
    private factory: FactorySerivce,
    private fb: FormBuilder,
    private message: NzMessageService
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
      keyword: [false],
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

  /**
   * 检查字段命名是否存在
   * @param control
   */
  existsField = (control: AbstractControl): any => {
    if (control.value === this.doc?.key) {
      return null;
    }
    if (this.page?.schema?.fields.hasOwnProperty(control.value)) {
      return { error: true, duplicated: true };
    }
    return null;
  };

  /**
   * 按字段类型设置扩展配置
   * @param type
   * @private
   */
  private setType(type: string): void {
    this.type = type;
    switch (this.type) {
      case 'number':
        /**
         * 数字类型初始化
         */
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
        /**
         * 时间类型初始化
         */
        this.form.setControl(
          'option',
          this.fb.group({
            time: [false]
          })
        );
        break;
      case 'radio':
      case 'checkbox':
        /**
         * 单选与复选初始化
         */
        this.form.setControl(
          'option',
          this.fb.group({
            values: this.fb.array([])
          })
        );
        this.doc?.option?.values?.forEach(() => this.addOptionValues());
        break;
      case 'select':
        /**
         * 选择器类型初始化
         */
        this.form.setControl(
          'option',
          this.fb.group({
            values: this.fb.array([]),
            multiple: [false]
          })
        );
        this.doc?.option?.values?.forEach(() => this.addOptionValues());
        break;
      case 'ref':
        /**
         * 引用类型初始化
         */
        this.form.setControl(
          'option',
          this.fb.group({
            reference: [null, [Validators.required]],
            target: [null, [Validators.required]],
            multiple: [false]
          })
        );
        this.factory.getReferences().subscribe(v => {
          this.references = [...v];
          for (const x of this.references) {
            this.referenceDict[x.schema!.key] = [...x.schema!.fields];
          }
        });
        break;
      case 'manual':
        /**
         * 自定义类型
         */
        this.form.setControl(
          'option',
          this.fb.group({
            component: [null, [Validators.required]]
          })
        );
        break;
    }
    this.visibleOption = hasOption.includes(this.type);
  }

  /**
   * 枚举表单控件数组
   */
  get optionValues(): FormArray {
    return this.form?.get('option')?.get('values') as FormArray;
  }

  /**
   * 新增枚举表单控件组
   */
  addOptionValues(): void {
    this.optionValues.push(
      this.fb.group({
        label: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  /**
   * 移除枚举表单控件组
   * @param index
   */
  removeOptionValues(index: number): void {
    this.optionValues.removeAt(index);
  }

  /**
   * 引用模型表单控件
   */
  get optionReference(): FormControl {
    return this.form?.get('option')?.get('reference') as FormControl;
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modal.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    if (!this.doc) {
      data.sort = this.page.schema?.fields.length;
      this.factory.addSchemaField(this.page._id, data).subscribe(() => {
        this.modal.triggerOk();
        this.message.success('字段新增完成');
      });
    } else {
      this.factory.updateSchemaField(this.page._id, this.doc!.key, data).subscribe(() => {
        this.modal.triggerOk();
        this.message.success('字段更新完成');
      });
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Observable, of, switchMap, throttleTime } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, Page, SchemaField, Value, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { FactorySerivce } from '../../factory.service';
import { fieldTypes, hasOption } from '../../values';
import { DefaultComponent } from '../default/default.component';

@Component({
  selector: 'app-factory-schema-form',
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
  form!: UntypedFormGroup;
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
  /**
   * 引用枚举
   */
  referenceValues: Value[] = [];
  /**
   * 无限
   */
  infinity = Infinity;

  constructor(
    public wpx: WpxService,
    private modal: NzModalService,
    private modalRef: NzModalRef,
    private factory: FactorySerivce,
    private fb: UntypedFormBuilder,
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
      if (this.doc?.option?.reference && this.doc.option.target) {
        this.setRefValues().subscribe(() => {});
      }
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

        this.optionTarget.valueChanges
          .pipe(
            throttleTime(500),
            switchMap(() => this.setRefValues())
          )
          .subscribe(() => {});
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
   * 配置表单控件
   */
  get option(): UntypedFormControl {
    return this.form.get('option') as UntypedFormControl;
  }

  /**
   * 枚举表单控件数组
   */
  get optionValues(): UntypedFormArray {
    return this.form.get('option')?.get('values') as UntypedFormArray;
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
  get optionReference(): UntypedFormControl {
    return this.form.get('option')?.get('reference') as UntypedFormControl;
  }

  /**
   * 引用目标字段表单控件
   */
  get optionTarget(): UntypedFormControl {
    return this.form.get('option')?.get('target') as UntypedFormControl;
  }

  /**
   * 设置引用枚举
   */
  setRefValues(): Observable<any> {
    const { option } = this.form.getRawValue();
    if (!option.reference) {
      return of([]);
    }
    return this.wpx.getRefValues(option.reference, option.target).pipe(
      map(v => {
        this.referenceValues = v;
      })
    );
  }

  /**
   * 打开默认值表单
   */
  setDefault(): void {
    this.modal.create({
      nzTitle: '设置默认值',
      nzWidth: 800,
      nzContent: DefaultComponent,
      nzComponentParams: {
        body: '{}'
      },
      nzOnOk: instance => {
        this.form.get('default')?.setValue(instance.data);
      }
    });
  }

  /**
   * 清除默认值
   */
  clearDefault(): void {
    this.form.get('default')?.setValue(null);
  }

  /**
   * 关闭表单
   */
  close(): void {
    this.modalRef.triggerCancel();
  }

  /**
   * 提交
   * @param data
   */
  submit(data: any): void {
    if (data.type === 'ref') {
      if (!data.option.multiple) {
      } else {
      }
    }
    if (!this.doc) {
      data.sort = this.page.schema?.fields.length;
      this.factory.addSchemaField(this.page._id, data).subscribe(() => {
        this.modalRef.triggerOk();
        this.message.success('字段新增完成');
      });
    } else {
      this.factory.updateSchemaField(this.page._id, this.doc!.key, data).subscribe(() => {
        this.modalRef.triggerOk();
        this.message.success('字段更新完成');
      });
    }
  }
}

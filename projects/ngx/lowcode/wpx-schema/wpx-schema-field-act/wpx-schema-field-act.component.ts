import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxSchemaService } from '@weplanx/ngx/lowcode';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Field, Schema } from '../types';
import { group } from './group';

@Component({
  selector: 'wpx-schema-field-act',
  templateUrl: './wpx-schema-field-act.component.html'
})
export class WpxSchemaFieldActComponent {
  group: Array<Record<string, any>> = group;
  type: Map<string, string> = new Map<string, string>([].concat(...this.group.map(v => v.values)));
  readonly special = ['integer', 'decimal', 'enum', 'reference'];

  data?: Schema;
  fields: Field[] = [];

  form?: FormGroup;
  visible = false;
  editable?: Field;

  @Output() readonly ok: EventEmitter<any> = new EventEmitter<any>();

  constructor(private schema: WpxSchemaService, private fb: FormBuilder, private notification: NzNotificationService) {}

  setData(value: Schema): void {
    this.data = value;
    this.fields = this.data?.fields ? [...this.data.fields] : [];
  }

  resetData(): void {
    this.data = undefined;
    this.fields = [];
  }

  open(value?: Field): void {
    this.form = this.fb.group({
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/), this.existsField]],
      label: [null, [Validators.required]],
      type: [null, [Validators.required]],
      description: [null],
      default: [null],
      unique: [false],
      required: [false],
      private: [false],
      option: this.fb.group({
        min: [null],
        max: [null],
        values: this.fb.array([]),
        multiple: [false],
        mode: [null],
        target: [null],
        to: [null]
      })
    });
    this.visible = true;
    if (value) {
      this.editable = value;
      this.form.patchValue(value);
      this.form.get('key')?.disable();
    }
  }

  existsField = (control: AbstractControl) => {
    if (this.fields.map(v => v.key).includes(control.value)) {
      return { error: true, duplicated: true };
    }
    return null;
  };

  close(): void {
    this.form = undefined;
    this.visible = false;
    this.editable = undefined;
  }

  get enumValues(): FormArray {
    return this.form?.get('option')?.get('values') as FormArray;
  }

  addEnum(): void {
    this.enumValues.push(
      this.fb.group({
        label: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    );
  }

  removeEnum(index: number): void {
    this.enumValues.removeAt(index);
  }

  submit(data: any): void {
    if (!this.editable) {
      this.schema.addField(this.data!._id, data).subscribe(v => {
        if (v.code === 0) {
          this.notification.success('操作成功', '内容类型更新完成');
          this.ok.emit(v);
          this.close();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    } else {
      this.schema.updateField(this.data!._id, this.editable.key, data).subscribe(v => {
        if (v.code === 0) {
          this.notification.success('操作成功', '内容类型更新完成');
          this.ok.emit(v);
          this.close();
        } else {
          this.notification.error('操作失败', v.message);
        }
      });
    }
  }

  sort(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.fields = [...this.fields];
    this.schema.sort(this.data!._id, this.fields).subscribe(v => {
      if (v.code === 0) {
        this.notification.success('操作成功', '字段排序刷新成功');
        this.ok.emit(v);
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }

  delete(data: any): void {
    this.schema.removeField(this.data!._id, data.key).subscribe(v => {
      if (v.code === 0) {
        this.notification.success('操作成功', '内容类型更新完成');
        this.ok.emit(v);
      } else {
        this.notification.error('操作失败', v.message);
      }
    });
  }
}

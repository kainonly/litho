import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormatDoc, SchemaField, SchemaRule, Value } from '@weplanx/ng';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

import { ApiService } from './api.service';
import { WpxFormInit } from './types';

@Component({
  selector: 'wpx-form',
  templateUrl: './form.component.html'
})
export class WpxFormComponent implements OnInit {
  @Input() wpxFields!: SchemaField[];
  @Input() wpxRules!: SchemaRule[];
  @Input() wpxSubmitHide = false;
  @Input() wpxSubmit = (value: any): void => {};
  @Output() readonly wpxInit: EventEmitter<WpxFormInit> = new EventEmitter<WpxFormInit>();

  form!: FormGroup;
  references: Record<string, Value[]> = {};
  infinity = Infinity;
  checkBoxOptions: Record<string, NzCheckBoxOptionInterface[]> = {};

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    const controlsConfig: Record<string, any[]> = {};
    const format: Record<string, FormatDoc> = {};
    for (const x of this.wpxFields) {
      const validator: any[] = [];
      if (x.required) {
        validator.push(Validators.required);
      }
      switch (x.type) {
        case 'checkbox':
          const options: NzCheckBoxOptionInterface[] =
            x.option?.values?.map<NzCheckBoxOptionInterface>(v => ({
              label: v.label,
              value: v.value
            })) ?? [];
          this.checkBoxOptions[x.key] = options;
          break;
        case 'ref':
          const { reference, target, multiple } = x.option!;
          if (!multiple) {
            format[x.key] = 'oid';
          } else {
            format[`${x.key!}.$in`] = 'oids';
          }
          this.api.getReference(reference!, target!).subscribe(v => {
            this.references[x.key] = v;
          });
          break;
      }
      controlsConfig[x.key] = [x.default, validator];
    }
    this.form = this.fb.group(controlsConfig);
    this.wpxInit.emit({
      form: this.form,
      format
    });
  }
}

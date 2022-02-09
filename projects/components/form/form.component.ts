import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Field } from '@weplanx/common';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'wpx-form',
  templateUrl: './form.component.html'
})
export class WpxFormComponent implements OnInit {
  @Input() wpxFields!: Field[];
  @Input() wpxRules!: any[];

  infinity = Infinity;
  form?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controlsConfig: Record<string, any[]> = {};
    for (const x of this.wpxFields) {
      const validator: any[] = [];
      if (x.required) {
        validator.push(Validators.required);
      }
      switch (x.type) {
        case 'checkbox':
          const values: NzCheckBoxOptionInterface[] =
            x.option?.values?.map<NzCheckBoxOptionInterface>(v => ({
              label: v.label,
              value: v.value
            })) ?? [];
          controlsConfig[x.key] = [values, validator];
          break;
        default:
          controlsConfig[x.key] = [x.default, validator];
      }
    }
    this.form = this.fb.group(controlsConfig);
  }

  submit(data: any): void {
    console.log(data);
  }
}

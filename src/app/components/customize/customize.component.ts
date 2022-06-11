import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SchemaField } from '@weplanx/ng';

@Component({
  selector: 'app-customize',
  template: `
    <nz-form-item style="width: 320px" [formGroup]="form">
      <nz-form-label [nzRequired]="field.required">{{ field.label }}</nz-form-label>
      <nz-form-control [nzExtra]="field.description ?? ''">
        <input nz-input [formControlName]="field.key" />
      </nz-form-control>
    </nz-form-item>
  `
})
export class CustomizeComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() field!: SchemaField;

  ngOnInit(): void {
    console.log(this.form);
    console.log(this.field);
  }
}

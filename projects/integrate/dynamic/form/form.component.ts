import { Component, OnInit } from '@angular/core';

import { FormatDoc, SchemaField, SchemaRule } from '@weplanx/ng';
import { WpxFormInit } from '@weplanx/ng/form';

import { WpxDynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  fields: SchemaField[] = [];
  rules: SchemaRule[] = [];
  format: Record<string, FormatDoc> = {};

  constructor(public dynamic: WpxDynamicService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
  }

  formInit(e: WpxFormInit): void {
    this.format = e.format;
  }

  submit = (value: any): void => {
    console.log(value);
  };
}

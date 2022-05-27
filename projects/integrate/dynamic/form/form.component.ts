import { Component, OnInit } from '@angular/core';

import { SchemaField, SchemaRule } from '@weplanx/ng';

import { WpxDynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  fields: SchemaField[] = [];
  rules: SchemaRule[] = [];

  constructor(public dynamic: WpxDynamicService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    console.log(schema);
    // this.fields = [...Object.values(schema!.fields).sort((a, b) => a.sort - b.sort)];
    // this.rules = [...(schema?.rules ?? [])];
  }
}

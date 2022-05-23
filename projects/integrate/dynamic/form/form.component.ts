import { Component, OnInit } from '@angular/core';

import { SchemaField, SchemaRule } from '@weplanx/ng';

import { DynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  fields: SchemaField[] = [];
  rules: SchemaRule[] = [];

  constructor(public pages: DynamicService) {}

  ngOnInit(): void {
    const schema = this.pages.page?.schema;
    console.log(schema);
    // this.fields = [...Object.values(schema!.fields).sort((a, b) => a.sort - b.sort)];
    // this.rules = [...(schema?.rules ?? [])];
  }
}

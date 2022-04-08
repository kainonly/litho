import { Component, OnInit } from '@angular/core';

import { SchemaField } from '@weplanx/common';

import { DynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  fields!: SchemaField[];
  rules!: any[];

  constructor(public dynamic: DynamicService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    this.fields = [...Object.values(schema!.fields).sort((a, b) => a.sort - b.sort)];
    this.rules = [...(schema?.rules ?? [])];
  }
}

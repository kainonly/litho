import { Component, OnInit } from '@angular/core';

import { SchemaField } from '@weplanx/ng';

import { PagesService } from '../pages.service';

@Component({
  selector: 'wpx-pages-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  fields!: SchemaField[];
  rules!: any[];

  constructor(public pages: PagesService) {}

  ngOnInit(): void {
    const schema = this.pages.page?.schema;
    this.fields = [...Object.values(schema!.fields).sort((a, b) => a.sort - b.sort)];
    this.rules = [...(schema?.rules ?? [])];
  }
}

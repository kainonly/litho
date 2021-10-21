import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WpxListByPage, WpxService } from '@weplanx/ngx';
import { PageOption, WpxLayoutService } from '@weplanx/ngx/layout';

import { Field, Schema } from '../wpx-schema/types';
import { WpxSchemaService } from '../wpx-schema/wpx-schema.service';
import { WpxTemplateService } from './wpx-template.service';

@Component({
  selector: 'wpx-template',
  templateUrl: './wpx-template.component.html'
})
export class WpxTemplateComponent implements OnInit {
  router?: string;
  private option?: PageOption;

  fields: Field[] = [];
  lists?: WpxListByPage;

  constructor(
    private wpx: WpxService,
    private route: ActivatedRoute,
    private layout: WpxLayoutService,
    private schema: WpxSchemaService,
    private template: WpxTemplateService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.getPage(v.pages.replace(',', '/'));
    });
  }

  getPage(path: string): void {
    this.layout.paths.subscribe(v => {
      const data = v.get(path);
      this.router = data!.router;
      this.option = data!.option;
      const schema = this.option!.schema;
      if (this.router === 'table') {
        this.lists = this.wpx.createListByPage({
          id: `search:${schema}`
        });
      }
      this.getSchema(schema);
      this.template.setModel(schema);
      this.getData();
    });
  }

  getSchema(key: string): void {
    this.schema.api.findOne<Schema>({ key }).subscribe(data => {
      const map: Map<string, Field> = new Map<string, Field>(data.fields?.map(v => [v.key, v]));
      this.fields = [
        ...(this.option?.fields
          .filter(v => v.display && !map.get(v.key)!.private)
          .map(v => {
            const field = map.get(v.key);
            field!.label = v.label;
            return field;
          }) as Field[])
      ];
    });
  }

  getData(): void {
    this.template.api.find().subscribe(data => {
      this.lists?.setData(data as any[]);
    });
  }
}

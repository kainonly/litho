import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { WpxService } from '@weplanx/ngx';
import { PageOption, WpxLayoutService } from '@weplanx/ngx/layout';

import { Field, Schema } from '../wpx-schema/types';
import { WpxSchemaService } from '../wpx-schema/wpx-schema.service';
import { WpxTemplateTableComponent } from './wpx-template-table/wpx-template-table.component';
import { WpxTemplateService } from './wpx-template.service';

@Component({
  selector: 'wpx-template',
  template: '<ng-container *cdkPortalOutlet="component"></ng-container>'
})
export class WpxTemplateComponent implements OnInit {
  component!: ComponentPortal<unknown>;

  constructor(
    private wpx: WpxService,
    private route: ActivatedRoute,
    private template: WpxTemplateService,
    private layout: WpxLayoutService,
    private schema: WpxSchemaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(map(v => v.get('fragments'))).subscribe(fragments => {
      this.initialize(fragments!);
    });
  }

  private initialize(fragments: string): void {
    this.layout.paths.subscribe(v => {
      if (!v.size) {
        return;
      }
      const page = v.get(fragments.replace(',', '/'))!;
      this.template.setTemplate(page.router!, page.option!);
      switch (page.router) {
        case 'table':
          this.component = new ComponentPortal(WpxTemplateTableComponent);
          break;
      }
      this.getSchema(page.option!);
    });
  }

  private getSchema(option: PageOption): void {
    this.schema.api.findOne<Schema>({ key: option.schema }).subscribe(data => {
      const map: Map<string, Field> = new Map<string, Field>(data.fields?.map(v => [v.key, v]));
      this.template.setFields(
        option.fields
          .filter(v => v.display && !map.get(v.key)!.private)
          .map(v => {
            const field = map.get(v.key)!;
            field.label = v.label;
            return field;
          }) as Field[]
      );
    });
  }
}

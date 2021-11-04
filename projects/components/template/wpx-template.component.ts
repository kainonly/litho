import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { PageOption, WpxService } from '@weplanx/components';
import { Schema, SchemaField, WpxSchemaService } from '@weplanx/components/settings';

import { CommonService } from './common.service';
import { WpxTemplateTableComponent } from './wpx-template-table/wpx-template-table.component';

@Component({
  selector: 'wpx-dynamic',
  template: '<ng-container *cdkPortalOutlet="component"></ng-container>'
})
export class WpxTemplateComponent implements OnInit {
  component!: ComponentPortal<unknown>;

  constructor(
    private wpx: WpxService,
    private route: ActivatedRoute,
    private common: CommonService,
    private schema: WpxSchemaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(map(v => v.get('fragments'))).subscribe(fragments => {
      this.initialize(fragments!);
    });
  }

  private initialize(fragments: string): void {
    this.wpx.paths.subscribe(v => {
      if (!v.size) {
        return;
      }
      const page = v.get(fragments.replace(',', '/'))!;
      this.common.setTemplate(page.router!, page.option!);
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
      const map: Map<string, SchemaField> = new Map<string, SchemaField>(data.fields?.map(v => [v.key, v]));
      this.common.setFields(
        option.fields
          .filter(v => v.display && !map.get(v.key)!.private)
          .map(v => {
            const field = map.get(v.key)!;
            field.label = v.label;
            return field;
          }) as SchemaField[]
      );
    });
  }
}

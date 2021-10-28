import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WpxApi, WpxService } from '@weplanx/ngx';
import { PageOption, WpxLayoutService } from '@weplanx/ngx/layout';

import { Field, Schema } from '../wpx-schema/types';
import { WpxSchemaService } from '../wpx-schema/wpx-schema.service';

@Injectable()
export class WpxTemplateService {
  router?: string;
  option?: PageOption;
  fields: BehaviorSubject<Field[]> = new BehaviorSubject<Field[]>([]);
  api!: WpxApi;

  constructor(private wpx: WpxService, private layout: WpxLayoutService, private schema: WpxSchemaService) {}

  setTemplate(fragments: string): void {
    this.layout.paths.subscribe(v => {
      if (!v.size) {
        return;
      }
      const page = v.get(fragments.replace(',', '/'));
      this.router = page!.router;
      this.option = page!.option;
      this.api = this.wpx.createApi(this.option!.schema);
      this.getFields(this.option!.schema);
    });
  }

  private getFields(key: string): void {
    this.schema.api.findOne<Schema>({ key }).subscribe(data => {
      const map: Map<string, Field> = new Map<string, Field>(data.fields?.map(v => [v.key, v]));
      this.fields.next(
        this.option?.fields
          .filter(v => v.display && !map.get(v.key)!.private)
          .map(v => {
            const field = map.get(v.key);
            field!.label = v.label;
            return field;
          }) as Field[]
      );
    });
  }
}

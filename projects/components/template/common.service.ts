import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api, PageOption, WpxService } from '@weplanx/components';
import { Schema, SchemaField, WpxSchemaService } from '@weplanx/components/settings';

@Injectable()
export class CommonService {
  router!: string;
  option!: PageOption;
  api!: Api;

  constructor(private wpx: WpxService, private schema: WpxSchemaService) {}

  setTemplate(router: string, option: PageOption): void {
    this.router = router;
    this.option = option;
    this.api = this.wpx.api(this.option.schema);
  }

  fields(): Observable<SchemaField[]> {
    return this.schema.api.findOne<Schema>({ key: this.option.schema }).pipe(
      map(data => {
        const values: Map<string, SchemaField> = new Map<string, SchemaField>(data.fields?.map(v => [v.key, v]));
        return this.option.fields
          .filter(v => v.display && !values.get(v.key)!.private)
          .map(v => {
            const field = values.get(v.key)!;
            field.label = v.label;
            return field;
          }) as SchemaField[];
      })
    );
  }
}

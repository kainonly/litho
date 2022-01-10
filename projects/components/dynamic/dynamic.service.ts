import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Api } from '@weplanx/common';

@Injectable()
export class DynamicService extends Api<any> {
  fields(): Observable<any[]> {
    return of([]);
    // return this.schema.api.findOne<Schema>({ key: this.option.schema }).pipe(
    //   map(data => {
    //     const values: Map<string, SchemaField> = new Map<string, SchemaField>(data.fields?.map(v => [v.key, v]));
    //     return this.option.fields
    //       .filter(v => v.display && !values.get(v.key)!.private)
    //       .map(v => {
    //         const field = values.get(v.key)!;
    //         field.label = v.label;
    //         return field;
    //       }) as SchemaField[];
    //   })
    // );
  }
}

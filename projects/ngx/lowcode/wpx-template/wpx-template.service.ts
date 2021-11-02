import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WpxApi, WpxService } from '@weplanx/ngx';
import { PageOption } from '@weplanx/ngx/layout';
import { NzTableSize } from 'ng-zorro-antd/table/src/table.types';

import { Field } from '../wpx-schema/types';

@Injectable()
export class WpxTemplateService {
  router!: string;
  option!: PageOption;
  api!: WpxApi;

  fields: BehaviorSubject<Field[]> = new BehaviorSubject<Field[]>([]);
  tableSize: NzTableSize = 'middle';

  constructor(private wpx: WpxService) {}

  setTemplate(router: string, option: PageOption): void {
    this.router = router;
    this.option = option;
    this.api = this.wpx.api(this.option.schema);
  }

  setFields(value: Field[]): void {
    this.fields.next(value);
  }
}

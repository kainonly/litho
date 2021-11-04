import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Api, PageOption, WpxService } from '@weplanx/components';
import { SchemaField } from '@weplanx/components/settings';

@Injectable()
export class CommonService {
  router!: string;
  option!: PageOption;
  api!: Api;

  fields: BehaviorSubject<SchemaField[]> = new BehaviorSubject<SchemaField[]>([]);

  constructor(private wpx: WpxService) {}

  setTemplate(router: string, option: PageOption): void {
    this.router = router;
    this.option = option;
    this.api = this.wpx.api(this.option.schema);
  }

  setFields(value: SchemaField[]): void {
    this.fields.next(value);
  }
}

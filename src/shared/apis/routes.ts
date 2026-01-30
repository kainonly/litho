import { Injectable } from '@angular/core';

import { toM } from '@shared';
import { EnumType, Route } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class RoutesApi extends Api<Route> {
  override collection = 'routes';

  types: EnumType[] = [
    { label: '页面', value: 1 },
    { label: '分组', value: 2 },
    { label: '外链', value: 3 },
    { label: 'IFRAME', value: 4 }
  ];
  typeM = toM(this.types);
}

import { Injectable } from '@angular/core';

import { toM } from '@shared';
import { EnumType, Org } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class OrgsApi extends Api<Org> {
  override collection = 'orgs';

  types: EnumType[] = [
    { label: '标准酒店', value: 1 },
    { label: '度假酒店', value: 2 },
    { label: '商务酒店', value: 3 },
    { label: '精品酒店', value: 4 },
    { label: '温泉酒店', value: 5 }
  ];
  typeM = toM(
    this.types,
    item => item.value,
    item => item.label
  );
}

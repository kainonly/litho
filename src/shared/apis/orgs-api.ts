import { Injectable } from '@angular/core';

import { toM } from '@shared';
import { EnumType, Org } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class OrgsApi extends Api<Org> {
  override collection = 'orgs';

  types: EnumType[] = [{ label: '内部组织', value: 1 }];
  typeM = toM(
    this.types,
    item => item.value,
    item => item.label
  );
}

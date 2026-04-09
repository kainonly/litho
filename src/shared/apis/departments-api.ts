import { Injectable } from '@angular/core';

import { toM } from '@shared';
import { EnumType, Department } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsApi extends Api<Department> {
  override collection = 'departments';

  types: EnumType[] = [{ label: '内部部门', value: 1 }];
  typeM = toM(
    this.types,
    item => item.value,
    item => item.label
  );
}

import { Pipe, PipeTransform } from '@angular/core';

import { NzTableSortOrder } from 'ng-zorro-antd/table/src/table.types';

@Pipe({ name: 'wpxOrder' })
export class OrderPipe implements PipeTransform {
  transform(value: Map<unknown, 1 | -1>, key: string): NzTableSortOrder {
    if (value.has(key)) {
      switch (value.get(key)) {
        case 1:
          return 'ascend';
        case -1:
          return 'descend';
        default:
          return null;
      }
    } else {
      return null;
    }
  }
}

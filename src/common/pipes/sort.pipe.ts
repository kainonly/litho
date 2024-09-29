import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@common';

@Pipe({
  standalone: true,
  name: 'appSort'
})
export class SortPipe implements PipeTransform {
  transform(value: Any[], field: string, sort: 1 | -1 = 1): Any[] {
    return value.sort((a, b) => {
      if (a[field] && b[field]) {
        return (a[field] - b[field]) * sort;
      }
      return 0;
    });
  }
}

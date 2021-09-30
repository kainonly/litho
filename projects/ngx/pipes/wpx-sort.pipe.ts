import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxSort' })
export class WpxSortPipe implements PipeTransform {
  transform(value: any[], field: string, sort: 1 | -1 = 1): any[] {
    if (!value) {
      return [];
    }
    return value.sort((a, b) => {
      if (a.hasOwnProperty(field) && b.hasOwnProperty(field)) {
        return (a[field] - b[field]) * sort;
      }
      return 0;
    });
  }
}

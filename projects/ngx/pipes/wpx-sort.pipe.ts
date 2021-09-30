import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxSort' })
export class WpxSortPipe implements PipeTransform {
  transform(value: any[], field: string, sort: 1 | -1 = 1): any[] {
    return value.sort((a, b) => (a[field] - b[field]) * sort);
  }
}

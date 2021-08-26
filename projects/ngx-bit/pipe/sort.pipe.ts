import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Sort' })
export class SortPipe implements PipeTransform {
  transform(value: any[], field: string, sort: 1 | -1 = 1): any[] {
    return value.sort((a, b) => (a[field] - b[field]) * sort);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Empty' })
export class EmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }
    return [undefined, null, '', 0, false].includes(value);
  }
}

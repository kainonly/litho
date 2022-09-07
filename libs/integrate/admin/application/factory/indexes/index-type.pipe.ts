import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'IndexType' })
export class IndexTypePipe implements PipeTransform {
  transform(value: any): string {
    if (value.hasOwnProperty('textIndexVersion')) {
      return 'text';
    }
    if (value.hasOwnProperty('2dsphereIndexVersion')) {
      return '2dsphere';
    }
    return '';
  }
}

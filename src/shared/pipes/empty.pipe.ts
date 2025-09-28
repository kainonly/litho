import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appEmpty'
})
export class EmptyPipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (value instanceof Array) {
      return value.length === 0;
    }
    if (value instanceof Object) {
      return Object.keys(value).length === 0;
    }
    if (value instanceof Date) {
      return new Date('1970-01-01T00:00:00Z').getTime() === value.getTime();
    }
    return !value;
  }
}

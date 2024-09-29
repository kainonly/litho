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
    return !value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'object' })
export class ObjectPipe implements PipeTransform {
  transform(value: string | object, locale?: string): any {
    try {
      const data = typeof value === 'object' ? value : JSON.parse(value);
      return !locale ? data : data[locale];
    } catch (e) {
      return '';
    }
  }
}

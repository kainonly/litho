import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'object' })
export class ObjectPipe implements PipeTransform {
  transform(value: string | Record<string, any>, locale?: string): any {
    try {
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      return !locale ? data : data[locale];
    } catch (e) {
      return null;
    }
  }
}

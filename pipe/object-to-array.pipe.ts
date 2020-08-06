import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ObjectToArray' })
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const array = [];
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          array.push({
            key,
            rows: value[key]
          });
        }
      }
      return array;
    } else {
      return [];
    }
  }
}

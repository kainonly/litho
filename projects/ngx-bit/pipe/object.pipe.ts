import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'object' })
export class ObjectPipe implements PipeTransform {
  transform(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}

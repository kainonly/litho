import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@common';

@Pipe({
  standalone: true,
  name: 'appObject'
})
export class ObjectPipe implements PipeTransform {
  transform(value: string): Any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}

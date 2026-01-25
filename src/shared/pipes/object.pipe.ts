import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appObject'
})
export class ObjectPipe implements PipeTransform {
  transform(value: string): unknown {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
}

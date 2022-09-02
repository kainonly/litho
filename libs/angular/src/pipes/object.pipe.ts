import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxObject' })
export class WpxObjectPipe implements PipeTransform {
  transform(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}

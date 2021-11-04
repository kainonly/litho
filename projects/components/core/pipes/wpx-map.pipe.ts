import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxMap' })
export class WpxMapPipe implements PipeTransform {
  transform(value: Map<unknown, unknown>, key: unknown): any {
    return value.get(key);
  }
}

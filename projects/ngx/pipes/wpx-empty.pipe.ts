import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxEmpty' })
export class WpxEmptyPipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (typeof value === 'object') {
      return Object.keys(value as Record<string, unknown>).length === 0;
    }
    return !!value;
  }
}

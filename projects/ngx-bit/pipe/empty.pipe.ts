import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Empty' })
export class EmptyPipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (typeof value === 'object') {
      return Object.keys(value as Record<string, unknown>).length === 0;
    }
    return !!value;
  }
}

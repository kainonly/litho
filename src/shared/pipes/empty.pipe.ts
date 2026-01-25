import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEmpty'
})
export class EmptyPipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    if (value instanceof Date) {
      return value.getTime() === EPOCH_TIME;
    }
    if (value && typeof value === 'object') {
      return Object.keys(value as Record<string, unknown>).length === 0;
    }
    return !value;
  }
}

const EPOCH_TIME = Date.parse('1970-01-01T00:00:00Z');

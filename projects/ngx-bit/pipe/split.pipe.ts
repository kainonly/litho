import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Split' })
export class SplitPipe implements PipeTransform {
  transform(value: string, separator: string): string[] {
    if (!value || !separator) {
      return [];
    }
    return value.split(separator);
  }
}

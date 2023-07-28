import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxBlank' })
export class WpxBlankPipe implements PipeTransform {
  transform<T>(value: T, replace = '-'): T | string {
    if (typeof value === 'undefined' || value === null || value === '') {
      return replace;
    }
    return value;
  }
}

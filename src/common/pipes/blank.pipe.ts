import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appBlank'
})
export class BlankPipe implements PipeTransform {
  transform<T>(value: T, replace = '暂无'): T | string {
    if (typeof value === 'undefined' || value === null || value === '') {
      return replace;
    }
    return value;
  }
}

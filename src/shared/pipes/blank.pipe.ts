import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appBlank'
})
export class BlankPipe implements PipeTransform {
  transform<T>(value: T, replace = '暂无'): T | string {
    if (typeof value === 'undefined' || value === null || value === '' || value === 0) {
      return replace;
    }
    return value;
  }
}

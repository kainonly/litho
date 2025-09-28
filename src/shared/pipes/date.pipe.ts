import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appDate'
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date, time = true, sec = false, year = true): string {
    let f = `MM-dd`;
    if (year) {
      f = `yyyy-MM-dd`;
    }
    if (time) {
      f += ` HH:mm`;
    }
    if (sec) {
      f += `:ss`;
    }
    return formatDate(value, f, 'zh-Hans');
  }
}

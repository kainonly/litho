import { formatDate } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDate'
})
export class DatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(value: string | number | Date, time = true, sec = false, year = true): string {
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
    return formatDate(value, f, this.locale);
  }
}

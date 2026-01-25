import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appEmptyDate'
})
export class EmptyDatePipe implements PipeTransform {
  transform(value: string | Date): boolean {
    if (value instanceof Date) {
      return value.getTime() === EMPTY_DATE_UTC || value.getTime() === EMPTY_DATE_TZ;
    }
    return value === EMPTY_DATE_UTC_TEXT || value === EMPTY_DATE_TZ_TEXT;
  }
}

const EMPTY_DATE_UTC_TEXT = '0001-01-01T00:00:00Z';
const EMPTY_DATE_TZ_TEXT = '0001-01-01T00:00:00+08:05';
const EMPTY_DATE_UTC = Date.parse(EMPTY_DATE_UTC_TEXT);
const EMPTY_DATE_TZ = Date.parse(EMPTY_DATE_TZ_TEXT);

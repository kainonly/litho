import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Locale'})
export class LocalePipe implements PipeTransform {
  transform(value: string | object, locale: string): string {
    try {
      if (typeof value === 'string') {
        const data = JSON.parse(value);
        return data[locale];
      } else {
        return value[locale];
      }
    } catch (e) {
      return '';
    }
  }
}

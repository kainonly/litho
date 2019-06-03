import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'JSONChose'})
export class JsonChosePipe implements PipeTransform {
  transform(value: string, locale?: any): any {
    try {
      if (locale !== undefined) {
        const data = JSON.parse(value);
        if (!data[locale]) {
          for (const i in data) {
            if (data.hasOwnProperty(i) && data[i]) {
              return data[i];
            }
          }
        } else {
          return data[locale];
        }
      } else {
        return JSON.parse(value);
      }
    } catch (e) {
      return {};
    }
  }
}

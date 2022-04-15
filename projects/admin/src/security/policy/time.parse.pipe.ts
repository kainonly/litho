import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeParse'
})
export class TimeParsePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const l = value.length;
    const number = value.slice(0, l - 1);
    let unit: string;
    switch (value[l - 1]) {
      case 'h':
        unit = '小时';
        break;
      case 'm':
        unit = '分钟';
        break;
      case 's':
        unit = '秒';
        break;
    }
    return `${number} ${unit!}`;
  }
}

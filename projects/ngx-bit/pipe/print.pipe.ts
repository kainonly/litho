import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Print' })
export class PrintPipe implements PipeTransform {
  transform(str: string, vars: string[]): string {
    if (!str) {
      return '';
    }
    vars.forEach((value, index) => {
      str = str.replace('$' + index, value);
    });
    return str;
  }
}

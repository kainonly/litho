import { Pipe, PipeTransform } from '@angular/core';

import { print } from 'ngx-bit/operates';

@Pipe({ name: 'Print' })
export class PrintPipe implements PipeTransform {
  transform(value: string, vars: any[]): string {
    return print(value, ...vars);
  }
}

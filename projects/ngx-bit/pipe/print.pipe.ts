import { Pipe, PipeTransform } from '@angular/core';
import { print } from 'ngx-bit/operates';

@Pipe({ name: 'Print' })
export class PrintPipe implements PipeTransform {
  transform(str: string, vars: any[]): string {
    return print(str, ...vars);
  }
}

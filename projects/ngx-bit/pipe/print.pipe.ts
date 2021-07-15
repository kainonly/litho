import { Pipe, PipeTransform, TemplateRef } from '@angular/core';

import { print } from 'ngx-bit/operates';

@Pipe({ name: 'Print' })
export class PrintPipe implements PipeTransform {
  transform(value: string, vars: Array<string | TemplateRef<unknown>>): string {
    return print(value, ...vars);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { empty } from 'ngx-bit/operates';

@Pipe({ name: 'Empty' })
export class EmptyPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return empty(value);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { Any } from '@shared/models';

@Pipe({
  standalone: true,
  name: 'appObject'
})
export class ObjectPipe implements PipeTransform {
  transform(value: string): Any {
    return JSON.parse(value);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { Any } from '@shared/models';

@Pipe({
  standalone: true,
  name: 'appMap'
})
export class MapPipe implements PipeTransform {
  transform(value: Map<Any, Any>, key: Any): Any {
    return value.get(key);
  }
}

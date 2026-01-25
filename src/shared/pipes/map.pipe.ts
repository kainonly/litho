import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appMap'
})
export class MapPipe implements PipeTransform {
  transform<K, V>(value: Map<K, V>, key: K): V | undefined {
    return value.get(key);
  }
}

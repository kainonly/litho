import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxMap' })
export class WpxMapPipe implements PipeTransform {
  transform(value: Map<any, any>, key: any): any {
    return value.get(key);
  }
}

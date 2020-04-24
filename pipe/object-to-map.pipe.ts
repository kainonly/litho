import { Pipe, PipeTransform } from '@angular/core';
import { objectToMap } from 'ngx-bit';

@Pipe({ name: 'ObjectToMap' })
export class ObjectToMapPipe implements PipeTransform {
  transform(value: any): Map<any, any> | boolean {
    return objectToMap(value);
  }
}

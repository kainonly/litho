import { Pipe, PipeTransform } from '@angular/core';
import { objectToArray } from 'ngx-bit';

@Pipe({ name: 'ObjectToArray' })
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return objectToArray(value);
  }
}

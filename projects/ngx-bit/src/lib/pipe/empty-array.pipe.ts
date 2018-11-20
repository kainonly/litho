import {Pipe, PipeTransform} from '@angular/core';
import {isArray} from 'util';

@Pipe({name: 'EmptyArray'})
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any[]): boolean {
    try {
      if (isArray(value)) {
        return value.length === 0;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

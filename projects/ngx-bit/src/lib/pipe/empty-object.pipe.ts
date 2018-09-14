import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'EmptyObject'})
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    try {
      if (typeof value === 'object') {
        return Object.keys(value).length === 0;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

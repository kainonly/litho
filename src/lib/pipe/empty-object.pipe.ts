import {Pipe, PipeTransform} from '@angular/core';
import {operates} from '../operates';

@Pipe({name: 'EmptyObject'})
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    return operates.emptyObject(value);
  }
}

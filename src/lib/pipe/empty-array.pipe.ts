import {Pipe, PipeTransform} from '@angular/core';
import {operates} from '../operates';

@Pipe({name: 'EmptyArray'})
export class EmptyArrayPipe implements PipeTransform {
  transform(value: any[]): boolean {
    return operates.emptyArray(value);
  }
}

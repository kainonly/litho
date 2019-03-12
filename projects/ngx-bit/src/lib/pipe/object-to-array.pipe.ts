import {Pipe, PipeTransform} from '@angular/core';
import {operates} from '../operates';

@Pipe({name: 'ObjectToArray'})
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return operates.objectToArray(value);
  }
}

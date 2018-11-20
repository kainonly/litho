import {Pipe, PipeTransform} from '@angular/core';
import {objectToMap} from '../operates';

@Pipe({name: 'ObjectToMap'})
export class ObjectToMapPipe implements PipeTransform {
  transform(value: any): Map<any, any> | boolean {
    return objectToMap(value);
  }
}

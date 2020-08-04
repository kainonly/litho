import { Pipe, PipeTransform } from '@angular/core';
import { emptyObject } from '../operates/empty-object';

@Pipe({ name: 'EmptyObject' })
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    return emptyObject(value);
  }
}

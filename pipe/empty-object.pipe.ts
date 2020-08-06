import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'EmptyObject' })
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    return (value !== null && typeof value === 'object' && !Array.isArray(value)) ?
      Object.keys(value).length === 0 : false;
  }
}

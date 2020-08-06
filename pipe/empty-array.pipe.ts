import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'EmptyArray' })
export class EmptyArrayPipe implements PipeTransform {
  transform(value: any[]): boolean {
    return Array.isArray(value) ? value.length === 0 : false;
  }
}

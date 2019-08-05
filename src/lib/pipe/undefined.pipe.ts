import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Undefined'})
export class UndefinedPipe implements PipeTransform {
  transform(value: any): boolean {
    return value === undefined;
  }
}

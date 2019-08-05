import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Defined'})
export class DefinedPipe implements PipeTransform {
  transform(value: any): boolean {
    return value !== undefined;
  }
}

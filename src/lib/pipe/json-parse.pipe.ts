import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'JSONParse'})
export class JsonParsePipe implements PipeTransform {
  transform(value: string, chkey?: any): any {
    try {
      return chkey !== undefined ? JSON.parse(value)[chkey] : JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}

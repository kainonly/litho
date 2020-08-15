import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'JSONParse' })
export class JsonParsePipe implements PipeTransform {
  transform(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}

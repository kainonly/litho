import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSplit'
})
export class SplitPipe implements PipeTransform {
  transform(value: string, separator: string): string[] {
    return value.split(separator);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appSplit'
})
export class SplitPipe implements PipeTransform {
  transform(value: string, separator: string): string[] {
    return value.split(separator);
  }
}

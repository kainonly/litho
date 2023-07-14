import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxSplit' })
export class WpxSplitPipe implements PipeTransform {
  transform(value: string, separator: string): string[] {
    return value.split(separator);
  }
}

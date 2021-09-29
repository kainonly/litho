import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wpxJoin' })
export class WpxJoinPipe implements PipeTransform {
  transform(value: string[], separator: string): string {
    return value.join(separator);
  }
}

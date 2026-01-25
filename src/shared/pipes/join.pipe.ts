import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appJoin'
})
export class JoinPipe implements PipeTransform {
  transform(value: readonly string[], separator: string): string {
    return value.join(separator);
  }
}

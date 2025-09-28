import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appJoin'
})
export class JoinPipe implements PipeTransform {
  transform(value: string[], separator: string): string {
    return value.join(separator);
  }
}

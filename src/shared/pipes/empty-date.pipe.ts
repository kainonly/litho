import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appEmptyDate'
})
export class EmptyDatePipe implements PipeTransform {
  transform(value: string | Date): boolean {
    return '0001-01-01T00:00:00Z' === value || '0001-01-01T00:00:00+08:05' === value;
  }
}

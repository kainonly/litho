import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'appSlice'
})
export class SlicePipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return value.slice(start, end);
  }
}
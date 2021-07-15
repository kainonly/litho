import { Pipe, PipeTransform } from '@angular/core';

import { privacy } from 'ngx-bit/operates';

@Pipe({ name: 'Privacy' })
export class PrivacyPipe implements PipeTransform {
  transform(value: string, range: string): string {
    const [start, end]: string[] = range.split(',');
    return privacy(value, parseInt(start), parseInt(end));
  }
}

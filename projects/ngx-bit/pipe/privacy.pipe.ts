import { Pipe, PipeTransform } from '@angular/core';
import { privacy } from 'ngx-bit/operates';

@Pipe({ name: 'Privacy' })
export class PrivacyPipe implements PipeTransform {
  transform(text: string, range: string): string {
    const [start, end]: any[] = range.split(',');
    return privacy(text, start, end);
  }
}

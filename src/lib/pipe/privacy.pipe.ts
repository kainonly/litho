import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'PrivacyPipe'})
export class PrivacyPipe implements PipeTransform {
  transform(text: string, range: string): string {
    const [start, end]: any[] = range.split(',');
    const match = text.slice(start, end);
    return text.replace(match, '*'.repeat(match.length));
  }
}

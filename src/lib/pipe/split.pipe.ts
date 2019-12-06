import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Split'})
export class SplitPipe implements PipeTransform {
  transform(text: string, symbol: string): string[] {
    if (!text || !symbol) {
      return [];
    }
    return text.split(symbol);
  }
}

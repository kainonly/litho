import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Split'})
export class SplitPipe implements PipeTransform {
  transform(text: string, symbol: string): string[] {
    return text.split(symbol);
  }
}

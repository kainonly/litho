import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'Join'})
export class JoinPipe implements PipeTransform {
  transform(origin: string[], symbol: string): string {
    return origin.join(symbol);
  }
}

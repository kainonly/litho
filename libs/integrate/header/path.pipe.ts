import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Nav, WpxService } from '@weplanx/ng';

@Pipe({ name: 'Path' })
export class PathPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(current: string): Observable<Nav[]> {
    return this.wpx.navsRecord.pipe(
      map((record) => {
        const path = [];
        let node: Nav | undefined = record[current];
        while (node) {
          path.unshift(node);
          node = node['parentNode'];
        }
        return path;
      })
    );
  }
}

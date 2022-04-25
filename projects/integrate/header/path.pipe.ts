import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, Page, WpxService } from '@weplanx/ng';

@Pipe({ name: 'Path' })
export class PathPipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(current: string): Observable<Array<AnyDto<Page>>> {
    return this.wpx.pages.pipe(
      map(v => {
        const path = [];
        let node = v[current];
        while (node) {
          path.unshift(node);
          node = node['parentNode'];
        }
        return path;
      })
    );
  }
}

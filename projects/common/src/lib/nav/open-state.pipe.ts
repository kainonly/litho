import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WpxService } from '../wpx.service';

@Pipe({ name: 'OpenState' })
export class OpenStatePipe implements PipeTransform {
  constructor(private wpx: WpxService) {}

  transform(id: string, current?: string): Observable<boolean> {
    return this.wpx.pages.pipe(
      map(v => {
        if (!current) {
          return false;
        }
        return v[current]['path'].includes(id);
      })
    );
  }
}

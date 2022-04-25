import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AnyDto, Page, WpxService } from '@weplanx/ng';

@Pipe({ name: 'OpenState' })
export class OpenStatePipe implements PipeTransform {
  private pages!: Record<string, AnyDto<Page>>;
  constructor(private wpx: WpxService) {}

  transform(id: string): Observable<boolean> {
    return this.wpx.pages.pipe(
      switchMap(v => {
        this.pages = v;
        return this.wpx.id;
      }),
      map(v => {
        if (!v) {
          return false;
        }
        let node = this.pages[v];
        while (node) {
          if (node._id === v) {
            return true;
          }
          node = node['parentNode'];
        }
        return false;
      })
    );
  }
}

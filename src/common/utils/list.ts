import { HttpParams } from '@angular/common/http';
import { signal } from '@angular/core';
import { debounceTime, iif, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { BasicDto, SearchInput } from '@common';
import { Api } from '@common/utils/api';

export class List<T extends BasicDto> {
  data = signal<T[]>([]);
  loading = signal<boolean>(false);
  page = 0;

  constructor(
    private api: Api<T>,
    private pagesize: number
  ) {}

  search(input: SearchInput): Observable<T[]> {
    return input.text$
      .asObservable()
      .pipe(debounceTime(200))
      .pipe(
        switchMap<string, Observable<T[]>>(q => {
          let params = new HttpParams();
          if (q) {
            params = params.set('q', q);
          }
          if (input.params) {
            params = input.params(params);
          }
          return iif(
            () => (input.condition ? input.condition() : true),
            this.api.find(params, { page: 1, pagesize: this.pagesize }).pipe(
              map(result => {
                return result.data;
              })
            ),
            of<T[]>([])
          );
        }),
        map(data => {
          this.data.set(data);
          return data;
        })
      );
  }
}

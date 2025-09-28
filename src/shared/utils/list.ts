import { HttpParams } from '@angular/common/http';
import { signal } from '@angular/core';
import { BehaviorSubject, debounceTime, iif, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '@shared/apis';
import { Basic } from '@shared/models';

export interface SearchInput {
  text$: BehaviorSubject<string>;
  ids?: string[];
  condition?: () => boolean;
  params?: (params: HttpParams) => HttpParams;
}

export class List<T extends Basic, D> {
  data = signal<(T & D)[]>([]);
  loading = signal<boolean>(false);

  constructor(private api: Api<T>) {}

  search(input: SearchInput): Observable<(T & D)[]> {
    return input
      .text$!.asObservable()
      .pipe(debounceTime(200))
      .pipe(
        switchMap<string, Observable<(T & D)[]>>(q => {
          let params = new HttpParams();
          if (q) {
            params = params.set('q', q);
          }
          if (input.params) {
            params = input.params(params);
          }
          return iif(() => (input.condition ? input.condition() : true), this.api.search<D>(params), of<(T & D)[]>([]));
        }),
        map(data => {
          this.data.set(data);
          return data;
        })
      );
  }
}

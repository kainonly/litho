import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';

import { AnyDto, Api, Dataset } from '@weplanx/common';

import { Media } from './types';

export class MediaDataSource extends DataSource<Array<AnyDto<Media>[number]>> {
  private readonly dataset: Dataset<AnyDto<Media>> = new Dataset<AnyDto<Media>>();
  private readonly stream = new BehaviorSubject<Array<AnyDto<Media>[number]>>([]);
  private readonly disconnect$ = new Subject<void>();
  private readonly pageIndexs = new Set();
  fetch$ = new Subject();

  connect(collectionViewer: CollectionViewer): Observable<Array<AnyDto<Media>[number]>> {
    collectionViewer.viewChange.pipe(takeUntil(this.disconnect$)).subscribe(range => {
      // this.lists.index = Math.floor((range.end * this.size) / this.lists.limit) + 1;
      this.fetch$.next(null);
    });
    return this.stream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  from(api: Api<AnyDto<Media>>): Observable<Array<AnyDto<Media>>> {
    return this.dataset.from(api).pipe(
      map(v => {
        const values: Array<Array<AnyDto<Media>>> = [];
        this.pageIndexs.add(this.dataset.pageIndex);
        v.forEach((value, index) => {
          const n = Math.trunc(index / 4);
          if (!values[n]) {
            values[n] = [];
          }
          values[n].push(value);
        });
        console.log(values);
        this.stream.next(values);
        return v;
      })
    );
  }
}

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AnyDto, Dataset } from '@weplanx/common';

import { MediaService } from './media.service';
import { Media } from './types';

export class MediaDataSource extends Dataset<AnyDto<Media>> implements DataSource<Array<AnyDto<Media>>> {
  private readonly stream = new BehaviorSubject<Array<Array<AnyDto<Media>>>>([]);
  private readonly disconnect$ = new Subject<void>();
  private readonly indexs: Set<number> = new Set<number>();
  private cache: Array<AnyDto<Media>> = [];
  /**
   * 每个列表包含卡片数量
   */
  itemSize: number = 0;

  constructor(private media: MediaService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Array<Array<AnyDto<Media>>>> {
    collectionViewer.viewChange.pipe(takeUntil(this.disconnect$)).subscribe(range => {
      const index = Math.floor((range.end * this.itemSize) / this.pageSize) + 1;
      if (this.indexs.has(index)) {
        return;
      }
      this.pageIndex = index;
      this.fetch(false);
    });
    return this.stream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  setSearchText(v: string): void {
    this.where = { name: { $regex: v } };
  }

  clearSearchText(): void {
    this.where = {};
  }

  fetch(refresh = false): void {
    if (refresh) {
      this.cache = [];
      this.stream.next([]);
      this.indexs.clear();
    }
    this.from(this.media, refresh).subscribe(data => {
      const values: Array<Array<AnyDto<Media>>> = [];
      this.cache.splice(this.pageIndex * this.pageSize, this.pageSize, ...data);
      this.cache.forEach((value, index) => {
        const n = Math.trunc(index / this.itemSize);
        if (!values[n]) {
          values[n] = [];
        }
        values[n].push(value);
      });
      this.indexs.add(this.pageIndex);
      this.stream.next(values);
    });
  }
}

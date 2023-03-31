import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AnyDto, WpxData } from '@weplanx/ng';

import { PicturesService } from '../pictures.service';
import { Media } from '../types';
import { VideosService } from '../videos.service';

export class WpxMediaViewDataSource extends WpxData<AnyDto<Media>> implements DataSource<Array<AnyDto<Media>>> {
  private readonly stream = new BehaviorSubject<Array<Array<AnyDto<Media>>>>([]);
  private readonly disconnect$ = new Subject<void>();
  private readonly indexs: Set<number> = new Set<number>();
  private readonly dict: Map<string, AnyDto<Media>> = new Map<string, AnyDto<Media>>();
  private cache: Array<AnyDto<Media>> = [];
  /**
   * Each list contains the number of cards
   */
  n = 0;

  constructor(private media: PicturesService | VideosService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Array<Array<AnyDto<Media>>>> {
    collectionViewer.viewChange.pipe(takeUntil(this.disconnect$)).subscribe(range => {
      const index = Math.floor((range.end * this.n) / this.pagesize) + 1;
      if (this.indexs.has(index)) {
        return;
      }
      this.page = index;
      this.fetch(false);
    });
    return this.stream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  fetch(refresh = false): void {
    if (refresh) {
      this.cache = [];
      this.stream.next([]);
      this.indexs.clear();
      this.dict.clear();
    }
    this.media.pages(this, refresh).subscribe(v => {
      const values: Array<Array<AnyDto<Media>>> = [];
      this.cache.splice(this.page * this.pagesize, this.pagesize, ...v);
      this.cache.forEach((value, index) => {
        this.dict.set(value._id, value);
        const n = Math.trunc(index / this.n);
        if (!values[n]) {
          values[n] = [];
        }
        values[n].push(value);
      });
      this.indexs.add(this.page);
      this.stream.next(values);
    });
  }

  getValue(id: string): AnyDto<Media> {
    return this.dict.get(id)!;
  }

  getUrls(ids: string[]): string[] {
    return ids.map(v => this.dict.get(v)!.url);
  }
}

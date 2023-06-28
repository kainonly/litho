import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AnyDto, WpxData } from '@weplanx/ng';

import { PicturesService } from './services/pictures.service';
import { VideosService } from './services/videos.service';
import { WpxMedia } from './types';

export class WpxMediaDataSource extends WpxData<AnyDto<WpxMedia>> implements DataSource<Array<AnyDto<WpxMedia>>> {
  private readonly stream = new BehaviorSubject<Array<Array<AnyDto<WpxMedia>>>>([]);
  private readonly disconnect$ = new Subject<void>();
  private readonly indexs: Set<number> = new Set<number>();
  private readonly dict: Map<string, AnyDto<WpxMedia>> = new Map<string, AnyDto<WpxMedia>>();
  private cache: Array<AnyDto<WpxMedia>> = [];
  /**
   * Each list contains the number of cards
   */
  n = 0;

  constructor(private media: PicturesService | VideosService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Array<Array<AnyDto<WpxMedia>>>> {
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
      const values: Array<Array<AnyDto<WpxMedia>>> = [];
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

  getValue(id: string): AnyDto<WpxMedia> {
    return this.dict.get(id)!;
  }

  getUrls(ids: string[]): string[] {
    return ids.map(v => {
      const data = this.dict.get(v)!;
      let url = data.url;
      if (data.query) {
        url += `?${data.query}`;
      }
      return url;
    });
  }
}

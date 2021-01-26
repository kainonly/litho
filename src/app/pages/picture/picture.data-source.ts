import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ListByPage } from 'ngx-bit/factory';
import { PictureService } from '@api/picture.service';

export class PictureDataSource extends DataSource<any> {
  lists: ListByPage;
  private preload$ = new Subject<any>();
  private preloadN = 0;
  private pages = new Set<number>();
  private idMap = new Map<any, number>();
  private stream = new BehaviorSubject<any[]>([]);
  private disconnect$ = new Subject<void>();

  constructor(
    private picture: PictureService,
    preload: number
  ) {
    super();
    this.preloadN = preload;
  }

  empty(): boolean {
    return this.lists.data.length === 0;
  }

  done(): void {
    if (this.preloadN !== 0) {
      this.preloadN -= 1;
    }
    this.preload$.next(this.preloadN);
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this.preload$.subscribe((n) => {
      if (n !== 0) {
        return;
      }
      this.fetchData(true);
      this.preload$.complete();
    });
    collectionViewer.viewChange.pipe(
      takeUntil(this.disconnect$)
    ).subscribe(range => {
      this.lists.index = Math.floor(range.end / this.lists.limit) + 1;
      this.fetchData();
    });
    return this.stream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  fetchData(refresh = false): void {
    if (refresh) {
      this.lists.data = [];
      this.lists.index = 1;
      this.pages.clear();
      this.idMap.clear();
    }
    if (this.pages.has(this.lists.index)) {
      return;
    }
    this.pages.add(this.lists.index);
    this.lists.ready.pipe(
      switchMap(() => this.picture.lists(this.lists, refresh, true))
    ).subscribe(data => {
      this.lists.data.splice(this.lists.index * this.lists.limit, this.lists.limit, ...data);
      this.lists.data.forEach(((value, index) => {
        this.idMap.set(value.id, index);
      }));

      this.lists.refreshStatus();
      this.stream.next(this.lists.data);
    });
  }

  delete(ids: any[]): void {
    for (const id of ids) {
      delete this.lists.data[this.idMap.get(id)];
    }
    this.lists.refreshStatus();
    this.stream.next(this.lists.data);
  }
}

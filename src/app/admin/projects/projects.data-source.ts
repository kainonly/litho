import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Project } from '@common/models/project';
import { AnyDto, Filter, WpxApi } from '@weplanx/ng';

export class ProjectsDataSource implements DataSource<AnyDto<Project>[]> {
  private stream = new BehaviorSubject<AnyDto<Project>[][]>([]);
  private disconnect$ = new Subject<void>();
  private indexs: Set<number> = new Set<number>();
  private cache: AnyDto<Project>[][] = [[]];
  loading = false;
  total = 0;

  /**
   * Each list contains the number of cards
   */
  n = 0;
  page = 1;
  pagesize = 0;

  searchText = '';

  constructor(private api: WpxApi<Project>) {}

  connect(collectionViewer: CollectionViewer): Observable<AnyDto<Project>[][]> {
    collectionViewer.viewChange.pipe(takeUntil(this.disconnect$)).subscribe(range => {
      const index = Math.floor((range.end * this.n) / this.pagesize) + 1;
      const max = Math.trunc(this.total / this.pagesize);
      if (this.indexs.has(index) || index > max) {
        return;
      }
      this.page = index;
      this.fetch(false);
    });
    return this.stream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  fetch(refresh = false): void {
    this.loading = true;

    if (refresh) {
      this.page = 1;
      this.cache = [[]];
      this.stream.next([]);
      this.indexs.clear();
    }

    const filter: Filter<Project> = {};

    if (this.searchText !== '') {
      filter.$or = [{ name: { $regex: '^' + this.searchText } }, { namespace: { $regex: '^' + this.searchText } }];
    }

    this.api
      .find(filter, {
        pagesize: this.pagesize,
        page: this.page
      })
      .subscribe(({ data, total }) => {
        this.total = total;
        let l = this.cache.length - 1;
        data.forEach(value => {
          if (this.cache[l].length === this.n) {
            l++;
          }
          if (!this.cache[l]) {
            this.cache[l] = [];
          }
          this.cache[l].push(value);
        });
        this.indexs.add(this.page);
        this.stream.next(this.cache);
        this.loading = false;
      });
  }
}

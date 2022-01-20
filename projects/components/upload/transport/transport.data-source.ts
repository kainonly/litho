import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Transport } from '../types';

export class TransportDataSource extends DataSource<Transport> {
  private readonly stream = new BehaviorSubject<Transport[]>([]);
  private readonly disconnect$ = new Subject<void>();

  connect(collectionViewer: CollectionViewer): Observable<Transport[]> {
    return this.stream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  set(v: Transport[]): void {
    this.stream.next(v);
  }
}

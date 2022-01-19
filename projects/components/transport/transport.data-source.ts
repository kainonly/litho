import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

export class TransportDataSource extends DataSource<any> {
  total = 0;
  doneLength = 0;
  percent = 0;
  done = new BehaviorSubject(true);
  complete = new Subject<NzUploadFile[]>();

  private datamap = new Map<string, any>();
  private stream = new BehaviorSubject<any[]>([]);
  private disconnect$ = new Subject<void>();

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.stream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  update(param: NzUploadChangeParam): void {
    const file = param.file;
    this.datamap.set(file.uid, {
      name: file.name,
      percent: Math.floor(file.percent!),
      status: file.status,
      file
    });
    const lists = [...this.datamap.values()];
    this.total = lists.length;
    this.doneLength = lists.filter(v => v.status === 'done').length;
    this.percent = Math.floor((this.doneLength / this.total) * 100);
    const done = lists.every(v => v.status === 'done');
    this.done.next(done);
    this.stream.next(lists);
    if (done) {
      this.complete.next(lists.map(v => v.file));
      this.datamap.clear();
    }
  }
}

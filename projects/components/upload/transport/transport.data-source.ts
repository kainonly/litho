import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

export class TransportDataSource extends DataSource<any> {
  private stream = new BehaviorSubject<any[]>([]);
  private disconnect$ = new Subject<void>();
  private files = new Map<string, any>();

  total = 0;
  doneLength = 0;
  percent = 0;
  done = new BehaviorSubject(true);
  complete = new Subject<NzUploadFile[]>();

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.stream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  update(param: NzUploadChangeParam): void {
    const file = param.file;
    this.files.set(file.uid, {
      name: file.name,
      percent: Math.floor(file.percent!),
      status: file.status,
      file
    });
    const fileList = [...this.files.values()];
    this.total = fileList.length;
    this.doneLength = fileList.filter(v => v.status === 'done').length;
    this.percent = Math.floor((this.doneLength / this.total) * 100);
    const done = fileList.every(v => v.status === 'done');
    this.done.next(done);
    this.stream.next(fileList);
    if (done) {
      this.complete.next(fileList.map(v => v.file));
      this.files.clear();
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

@Injectable()
export class UiSerivce {
  notOverflowHeight = new BehaviorSubject(0);
  notOverflowHeightUpdate = new Subject();

  setNotOverflowHeight(offset: number): Observable<any> {
    return this.notOverflowHeight.pipe(
      throttleTime(0),
      map(value => {
        return !value ? 0 : value + offset;
      })
    );
  }
}

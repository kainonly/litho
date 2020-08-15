import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMapTo } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable()
export class UpdateService {
  constructor(
    appRef: ApplicationRef,
    updates: SwUpdate
  ) {
    interval(3600000).pipe(
      switchMapTo(appRef.isStable),
      first(result => {
        return result === true;
      })
    ).subscribe(() => {
      updates.checkForUpdate();
    });
  }
}

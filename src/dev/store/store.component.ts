import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { WpxStoreService } from '@weplanx/ng/store';

import { MyDoc } from './types';

@Component({
  selector: 'dev-store',
  templateUrl: './store.component.html'
})
export class StoreComponent {
  title = '';

  constructor(private store: WpxStoreService) {}

  get(): void {
    this.store.get<MyDoc>('mydocs').subscribe(doc => {
      console.log(doc);
    });
  }

  set(): void {
    this.store.set<MyDoc>('mydocs', { title: 'hi' }).subscribe(result => {
      console.log(result);
    });
  }

  update(): void {
    this.store
      .get<MyDoc>('mydocs')
      .pipe(
        switchMap(doc => {
          console.log(doc);
          return this.store.set<MyDoc>('mydocs', { title: this.title }, doc._rev);
        })
      )
      .subscribe(result => {
        console.log(result);
      });
  }

  delete(): void {
    this.store
      .get<MyDoc>('mydocs')
      .pipe(
        switchMap(doc => {
          console.log(doc);
          return this.store.remove('mydocs', doc._rev);
        })
      )
      .subscribe(result => {
        console.log(result);
      });
  }
}

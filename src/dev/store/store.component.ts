import { Component } from '@angular/core';

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
    this.store.set<MyDoc>('mydocs', { title: this.title }).subscribe(result => {
      console.log(result);
    });
  }

  delete(): void {
    this.store.remove('mydocs').subscribe(() => {
      console.log('ok');
    });
  }
}

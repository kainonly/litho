import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { AppService } from '@app';
import { WpxStoreService } from '@weplanx/ng/store';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  constructor(public app: AppService, private store: WpxStoreService) {}

  ngOnInit(): void {
    this.store
      .get<{ title: string }>('mydoc')
      .pipe(
        switchMap(doc => {
          console.log(doc);
          return this.store.set<{ title: string }>(
            'mydoc',
            {
              title: 'abcd'
            },
            doc._rev
          );
        })
      )
      .subscribe(result => {
        console.log(result);
      });
  }
}

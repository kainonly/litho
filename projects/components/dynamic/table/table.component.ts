import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs';

import { Dataset, WpxService } from '@weplanx/common';

import { DynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  ds!: Dataset<any>;
  loading = true;

  constructor(private wpx: WpxService, public dynamic: DynamicService) {}

  ngOnInit(): void {
    this.dynamic
      .fields()
      .pipe(
        switchMap(fields => {
          // this.ds = this.wpx.dataset(this.dynamic.option!.schema, fields);
          return this.ds.ready;
        }),
        delay(300)
      )
      .subscribe(() => {
        this.loading = false;
        this.getData();
      });
  }

  getData(refresh = false): void {
    this.ds.from(this.dynamic, refresh).subscribe(() => {});
  }
}

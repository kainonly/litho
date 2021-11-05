import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs/operators';

import { Collection, WpxService } from '@weplanx/components';

import { CommonService } from '../common.service';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html'
})
export class WpxTemplateTableComponent implements OnInit {
  coll!: Collection<any>;
  loading = true;

  constructor(private wpx: WpxService, public common: CommonService) {}

  ngOnInit(): void {
    this.common
      .fields()
      .pipe(
        switchMap(v => {
          this.coll = this.wpx.collection(this.common.option!.schema, v);
          return this.coll.ready;
        }),
        delay(300)
      )
      .subscribe(() => {
        this.loading = false;
        this.getData();
      });
  }

  getData(refresh = false): void {
    this.coll.from(this.common.api, refresh).subscribe(v => {});
  }
}

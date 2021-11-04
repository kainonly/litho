import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Collection, WpxService } from '@weplanx/components';

import { CommonService } from '../common.service';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html'
})
export class WpxTemplateTableComponent implements OnInit {
  coll!: Collection<any>;

  constructor(private wpx: WpxService, public common: CommonService) {}

  ngOnInit(): void {
    this.common.fields.pipe(take(1)).subscribe(v => {
      console.log(v);
    });
    // this.coll = this.wpx.collection(this.template.option!.schema);
    this.getData();
  }

  getData(): void {
    // this.template.api.findByPage(this.lists!, true, true).subscribe(data => {
    //   this.lists?.setData(data as any[]);
    // });
  }
}

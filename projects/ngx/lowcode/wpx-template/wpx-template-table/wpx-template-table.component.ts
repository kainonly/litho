import { Component, OnInit } from '@angular/core';

import { WpxCollection, WpxService } from '@weplanx/ngx';
import { WpxTemplateService } from '@weplanx/ngx/lowcode';

@Component({
  selector: 'wpx-template-table',
  templateUrl: './wpx-template-table.component.html',
  styleUrls: ['./wpx-template-table.component.scss']
})
export class WpxTemplateTableComponent implements OnInit {
  coll!: WpxCollection<any>;

  constructor(private wpx: WpxService, public template: WpxTemplateService) {}

  ngOnInit(): void {
    this.template.fields.subscribe(v => {
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

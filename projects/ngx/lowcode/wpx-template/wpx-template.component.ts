import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { WpxPageNode } from '@weplanx/ngx/layout';

import { WpxPageSerivce } from '../wpx-page/wpx-page.serivce';

@Component({
  selector: 'wpx-template',
  templateUrl: './wpx-template.component.html'
})
export class WpxTemplateComponent implements OnInit {
  schema?: string;
  template?: string;

  constructor(private route: ActivatedRoute, private page: WpxPageSerivce) {}

  ngOnInit(): void {
    this.route.params.pipe(switchMap(v => this.page.api.findOne<WpxPageNode>({ _id: v.page }))).subscribe(v => {
      this.schema = v.router.schema;
      this.template = v.router.template;
    });
  }
}

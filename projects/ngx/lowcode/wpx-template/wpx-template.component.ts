import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Page } from '@weplanx/ngx/layout';

import { WpxPageSerivce } from '../wpx-page/wpx-page.serivce';

@Component({
  selector: 'wpx-template',
  templateUrl: './wpx-template.component.html'
})
export class WpxTemplateComponent implements OnInit {
  router?: string;
  schema?: string;

  constructor(private route: ActivatedRoute, private page: WpxPageSerivce) {}

  ngOnInit(): void {
    this.route.params.pipe(switchMap(v => this.page.api.findOne<Page>({ _id: v.id }))).subscribe(v => {
      console.log(v);
      this.router = v.router;
      this.schema = v.option?.schema;
    });
  }
}

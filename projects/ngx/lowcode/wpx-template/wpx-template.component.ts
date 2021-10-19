import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageOption, WpxLayoutService } from '@weplanx/ngx/layout';

import { WpxPageSerivce } from '../wpx-page/wpx-page.serivce';

@Component({
  selector: 'wpx-template',
  templateUrl: './wpx-template.component.html'
})
export class WpxTemplateComponent implements OnInit {
  router?: string;
  option?: PageOption;

  constructor(private route: ActivatedRoute, private page: WpxPageSerivce, private layout: WpxLayoutService) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.getPage(v.pages.replace(',', '/'));
    });
  }

  getPage(path: string): void {
    this.layout.paths.subscribe(v => {
      const data = v.get(path);
      this.router = data!.router;
      this.option = data!.option;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Page } from '@weplanx/common';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'wpx-settings-pages-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {
  key!: string;
  private page!: Page;

  constructor(private pages: PagesSerivce, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.key = v['key'];
      this.pages.key$.next(v['key']);
    });
  }
}

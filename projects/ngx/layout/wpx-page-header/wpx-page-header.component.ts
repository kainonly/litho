import { Component, OnInit } from '@angular/core';

import { Page } from '../types';
import { WpxLayoutService } from '../wpx-layout.service';

@Component({
  selector: 'wpx-page-header',
  templateUrl: './wpx-page-header.component.html'
})
export class WpxPageHeaderComponent implements OnInit {
  paths!: Map<string, Page>;

  constructor(public layout: WpxLayoutService) {}

  ngOnInit(): void {
    this.layout.paths.subscribe(v => {
      if (v.size) {
        this.paths = v;
      }
    });
  }
}

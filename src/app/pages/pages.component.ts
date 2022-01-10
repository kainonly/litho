import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { WpxService } from '@weplanx/common';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public app: AppService, public wpx: WpxService) {}

  ngOnInit(): void {
    this.app.api().subscribe(data => {
      this.wpx.loadPages(data.navs);
    });
  }
}

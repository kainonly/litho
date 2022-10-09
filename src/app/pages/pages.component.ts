import { Component, OnInit } from '@angular/core';

import { Nav, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  navs: Nav[] = [];

  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    // this.wpx.getNavs().subscribe(data => {
    //   this.navs = [...data];
    // });
  }
}

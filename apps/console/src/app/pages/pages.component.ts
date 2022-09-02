import { Component, OnInit } from '@angular/core';

import { Nav, WpxService } from '@weplanx/ng';

import { ExampleComponent } from './example/example.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  navs: Nav[] = [];

  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.getNavs().subscribe(data => {
      this.navs = [...data];
    });
    this.wpx.setScope('example', '接入示例页', ExampleComponent);
  }
}

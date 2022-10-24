import { Component, OnInit } from '@angular/core';

import { Nav, WpxService } from '@weplanx/ng';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html'
})
export class FactoryComponent implements OnInit {
  navs: Nav[] = [];

  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    // this.wpx.getNavs().subscribe(data => {
    //   this.navs = [...data];
    // });
  }
}

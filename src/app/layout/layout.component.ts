import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';
import { Resource } from '@common/data';
import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  navs: Resource[] = [];
  collapsed = false;
  constructor(public bit: BitService, private app: AppService) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.getResource();
  }

  private getResource(): void {
    this.app.resource().subscribe(data => {
      this.navs = data.navs;
    });
  }

  /**
   * 返回层级
   */
  level(nav: Resource): number {
    return nav.url.length * 16;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  actived!: string;

  constructor(public bit: BitService, public app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.getResource();
    this.onActived();
  }

  /**
   * 获取资源
   */
  private getResource(): void {
    this.app.resource().subscribe(data => {
      this.navs = data.navs;
    });
  }

  /**
   * 监听激活导航
   */
  onActived(): void {
    this.actived = this.router.url.slice(1).split('/')[0];
  }

  /**
   * 返回层级
   */
  level(nav: Resource): number {
    return nav.url.length * 16;
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  navs!: Resource[];
  dict!: Record<string, Resource>;
  paths!: Record<string, number>;

  actived!: string[];
  breadcrumbs: any[] = [];

  constructor(
    public bit: BitService,
    public app: AppService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.getResource();
  }

  /**
   * 获取资源
   */
  private getResource(): void {
    this.app.resource().subscribe(data => {
      this.navs = data.navs;
      this.dict = data.dict;
      this.paths = data.paths;
    });
  }

  /**
   * 获取标题
   */
  get title(): any {
    return this.dict[this.paths[this.actived.join('/')]].name;
  }

  /**
   * 监听激活导航
   */
  onActived(): void {
    this.actived = this.router.url.slice(1).split('/');
    this.breadcrumbs = [];
    for (let i = 0; i < this.actived.length; i++) {
      this.breadcrumbs.push(this.actived.slice(0, i + 1).join('/'));
    }
  }

  /**
   * 返回层级
   */
  level(nav: Resource): number {
    return nav.url.length * 16;
  }
}

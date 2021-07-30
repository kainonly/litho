import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '@common/app.service';
import { Resource, Resources } from '@common/types';
import { BitService } from 'ngx-bit';

import packer from './language';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  resources!: Resources;
  fragments!: string[];
  breadcrumbs: any[] = [];

  constructor(public bit: BitService, public app: AppService, private router: Router) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.app.resources().subscribe(data => {
      this.resources = data;
    });
  }

  /**
   * 获取标题
   */
  get title(): any {
    return this.resources.dict[this.resources.paths[this.fragments.join('/')]].name;
  }

  /**
   * 监听路由状态
   */
  onActived(): void {
    this.bit.ph = {};
    this.fragments = this.router.url.slice(1).split('/');
    this.breadcrumbs = [];
    for (let i = 0; i < this.fragments.length; i++) {
      this.breadcrumbs.push(this.fragments.slice(0, i + 1).join('/'));
    }
  }
}

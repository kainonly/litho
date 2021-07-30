import { Component, Input } from '@angular/core';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';
import { BitService } from 'ngx-bit';
import { BitRouterService, Resource } from 'ngx-bit/router';

@Component({
  selector: 'bit-sider-menu',
  templateUrl: './sider-menu.component.html',
  styleUrls: ['./sider-menu.component.scss']
})
export class SiderMenuComponent {
  @Input() theme: NzMenuThemeType = 'light';

  constructor(public bit: BitService, private router: BitRouterService) {}

  /**
   * 获取导航资源
   */
  get navs(): Resource[] {
    return this.router.resources.navs;
  }

  /**
   * 获取激活根片段
   */
  get actived(): string {
    return this.router.fragments[0];
  }

  /**
   * 通过层级计算 padding
   */
  padding(nav: Resource): number {
    return nav.url.length * 16;
  }
}

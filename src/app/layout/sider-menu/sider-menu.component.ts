import { Component, Input } from '@angular/core';

import { Resource } from '@common/types';
import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-layout-sider-menu',
  templateUrl: './sider-menu.component.html',
  styleUrls: ['./sider-menu.component.scss']
})
export class SiderMenuComponent {
  @Input() navs!: Resource[];
  @Input() actived!: string;

  constructor(public bit: BitService) {}

  /**
   * 返回层级
   */
  level(nav: Resource): number {
    return nav.url.length * 16;
  }
}

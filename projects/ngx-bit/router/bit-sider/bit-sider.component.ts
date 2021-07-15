import { Component, Input } from '@angular/core';

import { BitService } from 'ngx-bit';

import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-sider',
  templateUrl: './bit-sider.component.html',
  styleUrls: ['./bit-sider.component.scss']
})
export class BitSiderComponent {
  @Input() collapsed = false;
  @Input() data: unknown[] = [];

  constructor(public bit: BitService, public router: BitRouterService) {}

  /**
   * 返回层级
   */
  level(data: Record<string, unknown>): number {
    let deep = 0;
    while (data.hasOwnProperty('parentNode')) {
      deep++;
      data = data.parentNode as Record<string, unknown>;
    }
    return deep * 24;
  }
}

import { Component, Input } from '@angular/core';
import { BitRouterService } from '../bit-router.service';
import { Bit } from 'ngx-bit';

@Component({
  selector: 'bit-sider',
  templateUrl: './bit-sider.component.html',
  styleUrls: ['./bit-sider.component.scss']
})
export class BitSiderComponent {
  @Input() collapsed = false;
  @Input() data: any[] = [];

  constructor(public bit: Bit, public router: BitRouterService) {}

  /**
   * 返回层级
   */
  level(data: any): number {
    let deep = 0;
    while (data.hasOwnProperty('parentNode')) {
      deep++;
      data = data.parentNode;
    }
    return deep * 24;
  }
}

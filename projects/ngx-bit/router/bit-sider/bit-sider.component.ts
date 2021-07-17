import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BitService } from 'ngx-bit';

import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-sider',
  templateUrl: './bit-sider.component.html',
  styleUrls: ['./bit-sider.component.scss']
})
export class BitSiderComponent {
  @Input() collapsed = false;
  @Input() data: any[] = [];

  @Output() readonly collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public bit: BitService, public router: BitRouterService) {}

  change(value: any) {
    this.collapsedChange.emit(value);
  }

  /**
   * 返回层级
   */
  level(data: Record<string, any>): number {
    let deep = 0;
    while (data.hasOwnProperty('parentNode')) {
      deep++;
      data = data.parentNode as Record<string, any>;
    }
    return deep * 24;
  }
}

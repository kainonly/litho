import { Component, Input } from '@angular/core';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';
import { BitRouterService } from 'ngx-bit/router';

import { ResourceStruct } from '../types';

@Component({
  selector: 'bit-sider-menu',
  templateUrl: './bit-sider-menu.component.html'
})
export class BitSiderMenuComponent {
  @Input() theme: NzMenuThemeType = 'light';
  routers: ResourceStruct[] = [];

  constructor(public router: BitRouterService) {}
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';
import { BitService } from 'ngx-bit';
import { BitRouterService } from 'ngx-bit/router';

@Component({
  selector: 'bit-sider-menu',
  templateUrl: './sider-menu.component.html',
  styleUrls: ['./sider-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiderMenuComponent {
  @Input() theme: NzMenuThemeType = 'light';

  constructor(public bit: BitService, public router: BitRouterService) {}
}

import { Component, Input } from '@angular/core';

import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';

import { WpxService } from '../wpx.service';

@Component({
  selector: 'wpx-nav',
  templateUrl: './nav.component.html'
})
export class WpxNavComponent {
  @Input() nzTheme: NzMenuThemeType = 'light';

  constructor(public wpx: WpxService) {}
}

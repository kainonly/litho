import { Component, Input } from '@angular/core';

import { WpxService } from '@weplanx/common';
import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';

@Component({
  selector: 'wpx-nav',
  templateUrl: './nav.component.html'
})
export class WpxNavComponent {
  @Input() wpxTheme: NzMenuThemeType = 'light';

  constructor(public wpx: WpxService) {}
}

import { Component, Input } from '@angular/core';

import { WpxService } from '@weplanx/common';
import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';

@Component({
  selector: 'wpx-nav',
  templateUrl: './wpx-nav.component.html'
})
export class WpxNavComponent {
  @Input() theme: NzMenuThemeType = 'light';

  constructor(public wpx: WpxService) {}
}

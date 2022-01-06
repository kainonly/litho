import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { WpxService } from '@weplanx/common';
import { NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';

@Component({
  selector: 'wpx-nav',
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxNavComponent {
  @Input() nzTheme: NzMenuThemeType = 'light';

  constructor(public wpx: WpxService) {}
}

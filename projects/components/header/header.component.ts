import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxHeaderComponent {
  constructor(public wpx: WpxService) {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxPageHeaderComponent {
  constructor(public wpx: WpxService) {}
}

import { Component, Input } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-page-header',
  templateUrl: './page-header.component.html'
})
export class WpxPageHeaderComponent {
  @Input() wpxManual = false;

  constructor(public wpx: WpxService) {}
}

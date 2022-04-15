import { Component } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-nav',
  templateUrl: './nav.component.html'
})
export class WpxNavComponent {
  constructor(public wpx: WpxService) {}
}

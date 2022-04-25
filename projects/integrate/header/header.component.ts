import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class WpxHeaderComponent {
  constructor(public wpx: WpxService) {}
}

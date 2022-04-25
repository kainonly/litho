import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-center',
  templateUrl: './center.component.html'
})
export class CenterComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.manual = true;
  }
}

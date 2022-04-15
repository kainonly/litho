import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.pageId = undefined;
  }
}

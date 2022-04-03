import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Component({
  selector: 'wpx-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.pageId = undefined;
  }
}

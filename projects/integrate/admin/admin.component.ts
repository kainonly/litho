import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.pageId.next('');
  }
}

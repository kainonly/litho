import { Component, OnInit } from '@angular/core';

import { UserInfo, WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-center-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {}
}

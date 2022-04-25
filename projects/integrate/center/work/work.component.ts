import { Component, OnInit } from '@angular/core';

import { UserInfo, WpxService } from '@weplanx/ng';

@Component({
  selector: 'wpx-center-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  user!: UserInfo;
  constructor(public wpx: WpxService) {}

  ngOnInit(): void {
    this.wpx.getUser(true).subscribe(v => {
      console.log(v);
      this.user = v;
    });
  }
}

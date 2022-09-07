import { Component, OnInit } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'wpx-center',
  templateUrl: './center.component.html'
})
export class CenterComponent implements OnInit {
  constructor(public wpx: WpxService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.wpx.manual = true;
  }

  openProfile(): void {
    this.modal.create({
      nzTitle: `基本信息`,
      nzContent: ProfileComponent,
      nzOnOk: () => {
        this.wpx.getUser().subscribe(() => {});
      }
    });
  }
}

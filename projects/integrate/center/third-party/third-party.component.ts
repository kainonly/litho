import { Component } from '@angular/core';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'wpx-center-third-party',
  templateUrl: './third-party.component.html'
})
export class ThirdPartyComponent {
  constructor(public wpx: WpxService, private message: NzMessageService) {}

  linkFeishu(): void {
    this.wpx.feishu('link').subscribe(v => {
      window.open(v, '', 'width=800,height=640');
    });
  }

  unlinkFeishu(): void {
    this.wpx.setUser('unlink', { type: 'feishu' }).subscribe(() => {
      this.message.success('绑定已取消');
      this.wpx.getUser().subscribe(() => {});
    });
  }
}

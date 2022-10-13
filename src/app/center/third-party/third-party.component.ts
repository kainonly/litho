import { Component } from '@angular/core';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-center-third-party',
  templateUrl: './third-party.component.html'
})
export class ThirdPartyComponent {
  constructor(public wpx: WpxService, private app: AppService, private message: NzMessageService) {}

  linkFeishu(): void {
    this.wpx.oauth('link').subscribe(v => {
      const popup = window.open(v, '', 'width=800,height=640');
      const $timer = timer(0, 500).subscribe(() => {
        if (popup?.closed) {
          $timer.unsubscribe();
          this.app.getUser().subscribe(() => {});
        }
      });
    });
  }

  unlinkFeishu(): void {
    this.app.setUser({ reset: 'feishu' }).subscribe(() => {
      this.message.success('关联已取消');
      this.app.getUser().subscribe(() => {});
    });
  }
}

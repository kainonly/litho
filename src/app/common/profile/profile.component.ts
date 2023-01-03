import { Component } from '@angular/core';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  constructor(public app: AppService, private message: NzMessageService) {}

  linkFeishu(): void {
    this.app.oauth('link').subscribe(v => {
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

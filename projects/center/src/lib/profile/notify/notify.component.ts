import { Component } from '@angular/core';

@Component({
  selector: 'wpx-center-profile-notify',
  templateUrl: './notify.component.html'
})
export class NotifyComponent {
  notify: any[] = [
    { name: '通知提醒', internal: true, email: false },
    { name: '待办提醒', internal: true, email: false },
    { name: '订单提醒', internal: true, email: false },
    { name: '@我', internal: true, email: false }
  ];
}

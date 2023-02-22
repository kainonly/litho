import { Component } from '@angular/core';

@Component({
  selector: 'app-work-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  options = ['全部', '已读', '未读'];
  items: any[] = [];
}

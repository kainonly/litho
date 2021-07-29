import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
}

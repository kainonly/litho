import { Component } from '@angular/core';

import { MonitorService } from './monitor.service';

@Component({
  selector: 'app-admin-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent {
  constructor(public monitor: MonitorService) {}
}

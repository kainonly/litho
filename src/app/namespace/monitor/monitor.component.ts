import { Component } from '@angular/core';

import { AppService } from '@app';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent {
  constructor(public app: AppService) {}
}

import { Component } from '@angular/core';

import { logsData } from './data';

@Component({
  selector: 'app-center-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent {
  logs = logsData;
}
